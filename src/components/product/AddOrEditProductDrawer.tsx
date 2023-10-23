import { Button, Drawer, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomUploadImage from "src/components/CustomUploadImage";
import repositories from "src/repositories";
import {
  EIProductCategoryType,
  IProduct,
  IProductCategory,
} from "src/types/productTypes";
import { handleError } from "src/utils/handleError";

interface AddOrEditProductDrawerProps {
  open: boolean;
  selectedProduct?: IProduct;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddOrEditProductDrawer = (props: AddOrEditProductDrawerProps) => {
  const [categoriesList, setCategoriesList] = useState<IProductCategory[]>([]);

  const onClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      const imageResponse = await repositories.image.post(formData, "upload", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await repositories.product.post({
        ...data,
        image: `images/products/${imageResponse.data.filename}`,
      });

      toast.success("Thêm mới sản phẩm thành công");
    } catch (error) {
      handleError(error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    const getDataList = async () => {
      try {
        const response = await repositories.productCategory.getMany();
        setCategoriesList(
          response?.data?.map((item: IProductCategory) => ({
            ...item,
            label: item.name,
            value: item._id,
          }))
        );
      } catch (error) {
        handleError(error);
      }
    };
    if (props.open) {
      getDataList();
    }
  }, [props.open]);

  return (
    <Drawer
      closeIcon={false}
      width={600}
      open={props.open}
      title="Thêm mới sản phẩm"
      onClose={onClose}>
      <div>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui lòng tải hình ảnh sản phẩm!",
              },
            ]}>
            <CustomUploadImage />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm!",
              },
            ]}>
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>

          <div className="tw-flex tw-items-center tw-gap-6">
            <Form.Item
              className="tw-flex-1"
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá sản phẩm!",
                },
              ]}>
              <InputNumber
                className="tw-w-full"
                min={1}
                placeholder="Giá sản phẩm"
              />
            </Form.Item>

            <Form.Item
              className="tw-flex-1"
              label="Số lượng"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng sản phẩm!",
                },
              ]}>
              <InputNumber
                className="tw-w-full"
                min={1}
                placeholder="Số lượng sản phẩm"
              />
            </Form.Item>
          </div>

          <div className="tw-flex tw-items-center tw-gap-6">
            <Form.Item
              className="tw-flex-1"
              label="Loại thú cưng"
              name="petType"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại thú cưng!",
                },
              ]}>
              <Select
                options={categoriesList.filter(
                  (item) => item.type === EIProductCategoryType.BY_PET
                )}
                className="tw-w-full"
                placeholder="Loại thú cưng"
              />
            </Form.Item>

            <Form.Item
              className="tw-flex-1"
              label="Loại công dụng"
              name="uses"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại công dụng!",
                },
              ]}>
              <Select
                options={categoriesList.filter(
                  (item) => item.type === EIProductCategoryType.BY_USES
                )}
                className="tw-w-full"
                placeholder="Loại công dụng sản phẩm"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả sản phẩm!",
              },
            ]}>
            <Input.TextArea rows={7} placeholder="Mô tả sản phẩm" />
          </Form.Item>

          <div className="tw-mt-4 tw-flex tw-gap-4 tw-justify-end">
            <Button onClick={onClose} danger className="tw-w-[100px]">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" className="tw-w-[100px]">
              Thêm mới
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddOrEditProductDrawer;
