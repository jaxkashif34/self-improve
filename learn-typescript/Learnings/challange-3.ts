interface EventName<T> {
  eventName: keyof T; // keyof T = 'login' | 'logout'
}

interface MyEvent<T> extends EventName<T> {
  data: T[keyof T]; // T[keyof T] = T['login'] | T['logout'] = { user?: string | null; name?: string; hasSession?: boolean } | { user?: string }
}

// Question: what will be the value of MyEvent ?
// Answer: MyEvent = { eventName: 'login', data: { user?: string | null; name?: string; hasSession?: boolean } } | { eventName: 'logout', data: { user?: string } }
// Question: In MyEvent there are two fields eventName and data. Am  right ?
// Answer: Yes

interface MyEventFilter<T> extends EventName<T> {
  filter: (data: T[keyof T]) => boolean; // same above
}

interface MyEventMap<T> extends EventName<T> {
  map: (data: T[keyof T]) => T[keyof T]; // same above
}

class EventProcessor<T> {
  protected events: MyEvent<T>[] = [];
  protected eventFilters: MyEventFilter<T>[] = [];
  protected eventMaps: MyEventMap<T>[] = [];

  handleEvent(eventName: keyof T, data: T[keyof T]): void {
    // Question: what will be the value of keyof T ?
    // Answer: keyof T = 'login' | 'logout'
    // Question: what will be the value of data ?
    // Answer: data = { user?: string | null; name?: string; hasSession?: boolean } | { user?: string }
    this.events.push({ eventName, data });
  }

  addFilter(eventName: keyof T, filter: (data: T[keyof T]) => boolean): void {
    this.eventFilters.push({ eventName, filter });
  }

  addMap(eventName: keyof T, map: (data: T[keyof T]) => T[keyof T]): void {
    this.eventMaps.push({ eventName, map });
  }

  getProcessedEvents(): MyEvent<T>[] {
    let processedEvents: MyEvent<T>[] = [...this.events];
    this.eventFilters.forEach((eventFilter) => {
      processedEvents = processedEvents.filter((event) => {
        if (event.eventName === eventFilter.eventName) {
          return eventFilter.filter(event.data);
        } else {
          return true;
        }
      });
    });

    this.eventMaps.forEach((eventMap) => {
      processedEvents = processedEvents.map((event) => {
        if (event.eventName === eventMap.eventName) {
          return {
            ...event,
            data: { ...eventMap.map(event.data) },
          };
        }

        return event;
      });
    });

    return processedEvents;
  }
}

interface EventMap {
  login: { user?: string | null; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addFilter('login', ({ user }) => Boolean(user));

uep.addMap('login', (data: EventMap['login']) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

uep.handleEvent('login', {
  user: null,
  name: 'jack',
});
uep.handleEvent('login', {
  user: 'tom',
  name: 'tomas',
});
uep.handleEvent('logout', {
  user: 'tom',
});

console.log(uep.getProcessedEvents());
export {}