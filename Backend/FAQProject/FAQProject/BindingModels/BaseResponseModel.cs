namespace FAQProject.BindingModels
{
    public class BaseResponseModel
    {
        public BaseResponseModel(string message, bool isError, object data)
        {
            Message = message;
            IsError = isError;
            Data = data;
        }

        public BaseResponseModel()
        {

        }
        
        public string Message { get; set; }
        public bool IsError { get; set; }
        public object Data { get; set; }
    }
}
