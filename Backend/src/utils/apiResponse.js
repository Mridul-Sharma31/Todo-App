class apiResponse {
    constructor(statuscode,data,message="success"){
        this.statuscode=statuscode;
        this.message=message;
        this.success=true;
        this.data=data;
    }
}
export {apiResponse}