export class EventResponse {

  constructor(public result: string) {
  }

  static fromJson({
                    result,
                  }): EventResponse {
    return new EventResponse(
      result,
    );
  }
}
