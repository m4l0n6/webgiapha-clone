import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Vui lòng nhập tên đăng nhập hoặc email"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  familyName: z.string().min(2, "Vui lòng nhập tên dòng họ"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  birthDate: z.string().min(1, "Vui lòng nhập ngày sinh"),
  gender: z.string().min(1, "Vui lòng chọn giới tính"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  }) as {
    register: ReturnType<
      typeof useForm<LoginFormValues | RegisterFormValues>
    >["register"];
    handleSubmit: ReturnType<
      typeof useForm<LoginFormValues | RegisterFormValues>
    >["handleSubmit"];
    formState: {
      errors: Record<string, { message: string }>;
      isSubmitting: boolean;
    };
  };

  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    console.log("Form submitted:", data);
    // Implement authentication logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isLogin ? (
        <>
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="block font-medium text-gray-700 text-sm"
            >
              Tên đăng nhập hoặc email
            </label>
            <div className="mt-1">
              <Input
                id="usernameOrEmail"
                type="text"
                {...register("usernameOrEmail")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Nhập tên đăng nhập hoặc email"
              />
              {errors.usernameOrEmail && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.usernameOrEmail.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 text-sm"
            >
              Mật khẩu
            </label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="block pr-10 focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                className="right-0 absolute inset-y-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label
              htmlFor="fullName"
              className="block font-medium text-gray-700 text-sm"
            >
              Họ và tên
            </label>
            <div className="mt-1">
              <Input
                id="fullName"
                type="text"
                {...register("fullName")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="familyName"
              className="block font-medium text-gray-700 text-sm"
            >
              Tên dòng họ
            </label>
            <div className="mt-1">
              <Input
                id="familyName"
                type="text"
                {...register("familyName")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Ví dụ: Nguyễn Xuân"
              />
              {errors.familyName && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.familyName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 text-sm"
            >
              Email
            </label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block font-medium text-gray-700 text-sm"
            >
              Số điện thoại
            </label>
            <div className="mt-1">
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="birthDate"
              className="block font-medium text-gray-700 text-sm"
            >
              Ngày sinh
            </label>
            <div className="mt-1">
              <Input
                id="birthDate"
                type="date"
                {...register("birthDate")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
              />
              {errors.birthDate && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block font-medium text-gray-700 text-sm"
            >
              Giới tính
            </label>
            <div className="mt-1">
              <select
                id="gender"
                {...register("gender")}
                className="block focus:border-blue-500 focus:ring-blue-500 w-full"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 w-full"
        disabled={isSubmitting}
      >
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </Button>
    </form>
  );
};
