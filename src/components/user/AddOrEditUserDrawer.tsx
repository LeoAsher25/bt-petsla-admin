import { Button, Drawer, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import repositories from "src/repositories";
import { IUser } from "src/types/authTypes";
import { enumObjectList } from "src/utils/enumObject";
import { handleError } from "src/utils/handleError";

interface AddOrEditUserDrawerProps {
  open: boolean;
  selectedUser?: IUser;
  setOpen: (value: boolean) => void;
  submitSuccess: () => void;
}

const AddOrEditUserDrawer = (props: AddOrEditUserDrawerProps) => {
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    props.setOpen(false);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (props.selectedUser) {
        await repositories.user.patch(data, props.selectedUser?._id!);
      } else {
        await repositories.user.create(data);
      }
      toast.success(
        `${props.selectedUser ? "Cật nhật" : "Thêm mới"} người dùng thành công`
      );
      props.submitSuccess();
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (props.open) {
      if (props.selectedUser) {
        form.setFieldsValue({
          firstName: props.selectedUser.firstName,
          lastName: props.selectedUser.lastName,
          phoneNumber: props.selectedUser.phoneNumber,
          role: props.selectedUser.role,
          address: props.selectedUser.address,
          email: props.selectedUser.email,
          gender: props.selectedUser.gender,
          password: props.selectedUser.password,
        });
      }
    }
  }, [props.open, props.selectedUser, form]);

  return (
    <Drawer
      closeIcon={false}
      width={600}
      open={props.open}
      title={`${props.selectedUser ? "Cật nhật" : "Thêm mới"} người dùng`}
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

          <Form.Item
            className="tw-flex-1"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}>
            <Input
              disabled={!!props.selectedUser}
              className="tw-w-full"
              min={1}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            className="tw-flex-1"
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}>
            <Input className="tw-w-full" min={1} placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            className="tw-flex-1"
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}>
            <Input
              type="password"
              className="tw-w-full"
              min={1}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <div className="tw-flex tw-items-start tw-gap-6">
            <Form.Item
              className="tw-flex-1"
              label="Giới tính"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính!",
                },
              ]}>
              <Select
                options={enumObjectList.genderList.map((item) => ({
                  ...item,
                  label: item.text,
                }))}
                className="tw-w-full tw-h-[38px]"
                placeholder="Giới tính"
              />
            </Form.Item>

            <Form.Item
              className="tw-flex-1"
              label="Vai trò"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vai trò!",
                },
              ]}>
              <Select
                options={enumObjectList.userRoleList.map((item) => ({
                  ...item,
                  label: item.text,
                }))}
                className="tw-w-full tw-h-[38px]"
                placeholder="Vai trò"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}>
            <Input.TextArea rows={4} placeholder="Địa chỉ" />
          </Form.Item>

          <div className="tw-mt-4 tw-flex tw-gap-4 tw-justify-end">
            <Button onClick={onClose} danger className="tw-w-[100px]">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" className="tw-w-[100px]">
              {props.selectedUser ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddOrEditUserDrawer;
