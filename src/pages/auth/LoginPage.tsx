import { Button, Card, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import routesList from "src/constants/routesList";
import authThunkActions from "src/redux/auth/authThunkActions";

import { RootState, useAppDispatch, useAppSelector } from "src/redux/store";
import { ILoginRequestData } from "src/types/authTypes";

const LoginPage = () => {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: ILoginRequestData) => {
    const res: any = await dispatch(authThunkActions.login(data));
    if (res.payload.status === 200) {
      toast.success("Login successfully");
    } else {
      toast.error(res.payload.data.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate(routesList.HOME);
    }
  }, [accessToken, navigate]);

  return (
    <div className="login-page h-screen w-screen flex items-center justify-center -mt-16">
      <Card title="Login" bordered={false} className="w-[350px]">
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            // label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            // label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input placeholder="Password" />
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="-mt-2"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="ml-1" to={routesList.RESET_PASSWORD}>
              Forgot password
            </Link>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span>Do not have an account?</span>
          <Link className="ml-1" to={routesList.REGISTER}>
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
