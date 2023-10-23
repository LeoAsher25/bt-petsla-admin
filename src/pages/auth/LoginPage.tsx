import { Button, Card, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import routesList from "src/constants/routesList";
import authThunkActions from "src/redux/auth/authThunkActions";

import { RootState, useAppDispatch, useAppSelector } from "src/redux/store";
import { ILoginRequestData } from "src/types/authTypes";
import { IErrorResponse } from "src/types/commonTypes";
import { handleError } from "src/utils/handleError";

const LoginPage = () => {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: ILoginRequestData) => {
    try {
      const response: any = await dispatch(
        authThunkActions.login(data)
      ).unwrap();
      navigate(routesList.HOME);
      toast.success("Đăng nhập thành công");
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate(routesList.HOME);
    }
  }, [accessToken, navigate]);

  return (
    <div className="login-page tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center -tw-mt-16">
      <Card title="Login" bordered={false} className="tw-w-[350px]">
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            initialValue="test@gmail.com"
            rules={
              [
                // {
                //   required: true,
                //   message: "Vui lòng nhập email của bạn!",
                // },
              ]
            }>
            <Input placeholder="Email của bạn" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            initialValue="Test123@"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu của bạn!",
              },
            ]}>
            <Input type="password" placeholder="Mật khẩu của bạn" />
          </Form.Item>

          {/* <div className="flex justify-between">
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="-mt-2">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="ml-1" to={routesList.RESET_PASSWORD}>
              Forgot password
            </Link>
          </div> */}

          <Form.Item className="tw-mt-6">
            <Button type="primary" htmlType="submit" className="tw-w-full">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* <div className="text-center">
          <span>Do not have an account?</span>
          <Link className="ml-1" to={routesList.REGISTER}>
            Register
          </Link>
        </div> */}
      </Card>
    </div>
  );
};

export default LoginPage;
