class apiError extends Error{
//we need success,message,data, and its always good to send statuscode so we will keep that as well
    constructor(statuscode,message,errors,stack=""){
        super(message)
        this.statuscode=statuscode;
        this.message=message;
        this.errors=errors //error raised, data should be null
        this.success=false;
        this.data=null;

        if(stack){
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }

}
export {apiError}