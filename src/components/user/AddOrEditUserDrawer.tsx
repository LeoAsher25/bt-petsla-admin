import { Button, Drawer, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import repositories from "src/repositories";
import { IUser } from "src/types/authTypes";
import {
  EIProductCategoryType,
  IProductCategory,
} from "src/types/productTypes";
import { handleError } from "src/utils/handleError";

interface AddOrEditUserDrawerProps {
  open: boolean;
  selectedProduct?: IUser;
  setOpen: (value: boolean) => void;
  submitSuccess: () => void;
}

const AddOrEditUserDrawer = (props: AddOrEditUserDrawerProps) => {
  const [categoriesList, setCategoriesList] = useState<IProductCategory[]>([]);

  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    props.setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image);

      toast.success(
        `${
          props.selectedProduct ? "Cật nhật" : "Thêm mới"
        } người dùng thành công`
      );
      props.submitSuccess();
    } catch (error) {
      handleError(error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (props.open) {
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
      getDataList();

      if (props.selectedProduct) {
        form.setFieldsValue({
          firstName: props.selectedProduct.firstName,
          lastName: props.selectedProduct.lastName,
        });
      }
    }
  }, [props.open, props.selectedProduct, form]);

  useEffect(() => {}, [categoriesList, props.selectedProduct, form]);

  return (
    <Drawer
      closeIcon={false}
      width={600}
      open={props.open}
      title={`${props.selectedProduct ? "Cật nhật" : "Thêm mới"} người dùng`}
      onClose={onClose}>
      <div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="tw-flex tw-items-start tw-gap-6">
            <Form.Item
              label="Họ"
              className="tw-flex-1"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên!",
                },
              ]}>
              <Input placeholder="Họ" />
            </Form.Item>

            <Form.Item
              label="Tên"
              className="tw-flex-1"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ!",
                },
              ]}>
              <Input placeholder="Họ" />
            </Form.Item>
          </div>

          <div className="tw-flex tw-items-start tw-gap-6">
            <Form.Item
              className="tw-flex-1"
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá người dùng!",
                },
              ]}>
              <InputNumber
                className="tw-w-full"
                min={1}
                placeholder="Giá người dùng"
              />
            </Form.Item>

            <Form.Item
              className="tw-flex-1"
              label="Số lượng"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng người dùng!",
                },
              ]}>
              <InputNumber
                className="tw-w-full"
                min={1}
                placeholder="Số lượng người dùng"
              />
            </Form.Item>
          </div>

          <div className="tw-flex tw-items-start tw-gap-6">
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
              name="usesTypes"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại công dụng!",
                },
              ]}>
              <Select
                mode="multiple"
                options={categoriesList.filter(
                  (item) => item.type === EIProductCategoryType.BY_USES
                )}
                className="tw-w-full"
                placeholder="Loại công dụng người dùng"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả người dùng!",
              },
            ]}>
            <Input.TextArea rows={12} placeholder="Mô tả người dùng" />
          </Form.Item>

          <div className="tw-mt-4 tw-flex tw-gap-4 tw-justify-end">
            <Button onClick={onClose} danger className="tw-w-[100px]">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" className="tw-w-[100px]">
              {props.selectedProduct ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddOrEditUserDrawer;
