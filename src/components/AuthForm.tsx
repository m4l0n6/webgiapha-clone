
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  familyName: z.string().min(2, "Vui lòng nhập tên dòng họ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  birthDate: z.string().min(1, "Vui lòng nhập ngày sinh"),
  gender: z.string().min(1, "Vui lòng chọn giới tính"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

type FormValues = LoginFormValues | RegisterFormValues;

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        
        toast.success("Đăng nhập thành công!");
        navigate("/family-tree");
      } else {
        const registerData = data as RegisterFormValues;
        const { error } = await supabase.auth.signUp({
          email: registerData.email,
          password: registerData.password,
          options: {
            data: {
              full_name: registerData.fullName,
              family_name: registerData.familyName,
              phone: registerData.phone,
              birth_date: registerData.birthDate,
              gender: registerData.gender,
            },
          },
        });

        if (error) throw error;
        
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1"
          placeholder="Nhập email của bạn"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="mt-1"
            placeholder="Nhập mật khẩu"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {!isLogin && (
        <>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <Input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="mt-1"
              placeholder="Nhập họ và tên"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{(errors as any).fullName?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
              Tên dòng họ
            </label>
            <Input
              id="familyName"
              type="text"
              {...register("familyName")}
              className="mt-1"
              placeholder="Nhập tên dòng họ"
            />
            {errors.familyName && (
              <p className="mt-1 text-sm text-red-600">{(errors as any).familyName?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="mt-1"
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{(errors as any).phone?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
              Ngày sinh
            </label>
            <Input
              id="birthDate"
              type="date"
              {...register("birthDate")}
              className="mt-1"
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{(errors as any).birthDate?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{(errors as any).gender?.message}</p>
            )}
          </div>
        </>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </Button>
    </form>
  );
};
