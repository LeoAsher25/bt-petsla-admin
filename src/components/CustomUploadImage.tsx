import { Upload } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadRequestOption } from "rc-upload/lib/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("Bạn chỉ có thể tải file dạng PNG/JPG!");
  }
  const iamgeSize = file.size / 1024 / 1024 < 10;
  if (!iamgeSize) {
    toast.error("Dung lượng ảnh phải nhỏ hơn 10MB!");
  }
  return isJpgOrPng && iamgeSize;
};

type CustomUploadImageProps = {
  value?: RcFile;
  onChange?: (value?: File) => void;
};

const CustomUploadImage: React.FC<CustomUploadImageProps> = ({
  value,
  onChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        if (onChange) {
          onChange(info.file.originFileObj);
        }
      });
    }
  };

  const customRequest = (options: UploadRequestOption<any>) => {
    if (options.onSuccess) {
      options.onSuccess(options.file);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
  );

  return (
    <Upload
      name="image"
      listType="picture-card"
      customRequest={customRequest}
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default CustomUploadImage;
