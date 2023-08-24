interface CustomError{
	Msg:string;
	Code:number;
}

export const error = {
    10001: "record not found",
    10002: "record deleted error",
    10003: "record already exist",
    10004: "record created error",
    10005: "record updated error",
    10006: "record query error",
    10007: "internal error",
}
