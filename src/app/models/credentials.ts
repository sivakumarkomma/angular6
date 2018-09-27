export class Credentials {

    constructor( public username: string,
        public password: string) {

        }

        static build(params?: {
            username?: string,
            password?: string,
        }
        ): Credentials {
            return new Credentials(
                params && params.username ? params.username : null,
                params && params.password ? params.password : '',
            );
        }

}
