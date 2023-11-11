import { Button, Drawer, Form, Input, InputNumber, Select, Switch } from "antd";
import { useEffect, useState } from "react";
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
  setOpen: (value: boolean) => void;
  submitSuccess: () => void;
}

const AddOrEditProductDrawer = (props: AddOrEditProductDrawerProps) => {
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

      if (data.image !== props.selectedProduct?.image) {
        const imageResponse = await repositories.image.post(
          formData,
          "upload",
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await repositories.product.post({
          ...data,
          image: `images/products/${imageResponse.data.filename}`,
        });
      } else {
        await repositories.product.patch(
          {
            ...data,
          },
          props.selectedProduct?._id as string
        );
      }

      toast.success(
        `${props.selectedProduct ? "Cật nhật" : "Thêm mới"} sản phẩm thành công`
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
          name: props.selectedProduct.name,
          image: props.selectedProduct.image,
          price: props.selectedProduct.price,
          isSpecial: props.selectedProduct.isSpecial,
          stock: props.selectedProduct.stock,
          usesTypes: props.selectedProduct.usesTypes?.map((item) => item._id),
          petType: props.selectedProduct.petType?._id,
          description: props.selectedProduct.description,
        });
      }
    }
  }, [props.open, props.selectedProduct, form]);

  useEffect(() => {
    if (props.selectedProduct) {
      form.setFieldsValue({
        usesTypes: props.selectedProduct.usesTypes?.map((item) => item._id),
        petType: props.selectedProduct.petType?._id,
      });
    }
  }, [categoriesList, props.selectedProduct, form]);

  return (
    <Drawer
      closeIcon={false}
      width={600}
      open={props.open}
      title={`${props.selectedProduct ? "Cật nhật" : "Thêm mới"} sản phẩm`}
      onClose={onClose}>
      <div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui lòng tải hình ảnh sản phẩm!",
              },
            ]}>
            <CustomUploadImage value={props.selectedProduct?.image} />
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

          <div className="tw-flex tw-items-start tw-gap-6">
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
                placeholder="Loại công dụng sản phẩm"
              />
            </Form.Item>
          </div>

          <Form.Item label="Sản phẩm đặc biệt?" name="isSpecial">
            <Switch defaultChecked={props.selectedProduct?.isSpecial} />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả sản phẩm!",
              },
            ]}>
            <Input.TextArea rows={12} placeholder="Mô tả sản phẩm" />
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

export default AddOrEditProductDrawer;
