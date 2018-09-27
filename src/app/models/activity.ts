
export interface IActivity  {
  id: number;
  name: string;
  description: string;
  done: boolean;
  completionDate: string;
  attachmentPath: string;
}

export class Activity implements IActivity {
  id: number = null;
  name: string = null;
  description: string = null;
  done: boolean = null;
  completionDate: string = null;
  attachmentPath: string = null;

  constructor(activity?: IActivity) {
    Object.assign(this, activity);
  }

  static fromJson(activity: IActivity): Activity {
    return new Activity({
      ...activity,
    });
  }

  static fromJsonArray(json: IActivity[]): Activity[] {
    return json ? json.map(Activity.fromJson) : [];
  }

}
