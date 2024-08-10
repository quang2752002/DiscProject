namespace DiscApi.Extentions
{
    public class FileHelper
    {
        private const string _basePath = "wwwroot";

        private const string _uploadFolder = "uploads";

        public static string UploadFile(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return "";
                }
                var directoryPath = Path.Combine(_basePath, _uploadFolder);
                Directory.CreateDirectory(directoryPath);
                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                var filePath = Path.Combine(directoryPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                var relativePath = filePath.Replace("wwwroot", "").Replace("\\", "/");
                return relativePath;
            }
            catch
            {
                return "";
            }
        }

        public static void RemoveFile(string path)
        {
            string filePath = path.Insert(0, "wwwroot").Replace("/", "\\");
            if (File.Exists(filePath))
            {
                try
                {
                    File.Delete(filePath);
                }
                catch
                {
                    return;
                }
            }
            else
            {
                return;
            }
        }
    }
}