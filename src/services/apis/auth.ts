export type Profile= {
    id: number,
    created: string,
    updated: string,
    age: number,
    location: string,
    QQ: string,
    telephone: string,
    gender: string,
    avator: string,
    first_login: true,
    // "roles": [] # TODO
}


export type User =  {
    last_login:string,
    first_name:string,
    username:string,
    last_name:string,
    email:string,
    profile?:Profile
}

