enum TypeTimelineItem {
  school,
  work
}

export class TimelineItem {
  static readonly TypeTimelineItem = TypeTimelineItem;

  id: string;
  title: object;
  dateBegin: Date;
  dateEnd: Date;
  place: string;
  description: object;
  type: TypeTimelineItem;

  constructor(values: object = {}) {
    //this.id = values.sys.id ? values.sys.id : null;



  }
}
