import { Upload } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const { Dragger } = Upload;

interface Props {
  onLoad: (text: string) => void;
}

const FileUploader = ({ onLoad }: Props) => {
  const getText = async (file: RcFile) => {
    const content = await file.text();
    onLoad(content);
    // Prevent upload
    return false;
  };

  return (
    <Dragger
      name="file-upload"
      accept=".txt"
      beforeUpload={getText}
      maxCount={1}
    >
      <p className="ant-upload-drag-icon">
        <FileTextOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Please upload the Discography.txt file.</p>
    </Dragger>
  );
};
export default FileUploader;
