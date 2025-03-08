
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const registerSchema = loginSchema.extend({
  familyName: z.string().min(2, 'Vui lòng nhập tên dòng họ'),
  ancestorName: z.string().min(2, 'Vui lòng nhập họ và tên vị tổ'),
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
  });

  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    console.log('Form submitted:', data);
    // Implement authentication logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Số điện thoại
        </label>
        <div className="mt-1">
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className="block w-full"
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <div className="mt-1 relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="block w-full pr-10"
            placeholder="Nhập mật khẩu"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      {!isLogin && (
        <>
          <div>
            <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
              Tên dòng họ
            </label>
            <div className="mt-1">
              <Input
                id="familyName"
                type="text"
                {...register('familyName')}
                className="block w-full"
                placeholder="Ví dụ: Nguyễn Xuân"
              />
              {errors.familyName && (
                <p className="mt-1 text-sm text-red-600">{errors.familyName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="ancestorName" className="block text-sm font-medium text-gray-700">
              Họ và tên vị tổ đầu tiên
            </label>
            <div className="mt-1">
              <Input
                id="ancestorName"
                type="text"
                {...register('ancestorName')}
                className="block w-full"
                placeholder="Ví dụ: Nguyễn Xuân Lam"
              />
              {errors.ancestorName && (
                <p className="mt-1 text-sm text-red-600">{errors.ancestorName.message}</p>
              )}
            </div>
          </div>
        </>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
      </Button>
    </form>
  );
};
