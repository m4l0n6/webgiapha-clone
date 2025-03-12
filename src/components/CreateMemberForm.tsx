
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const createMemberSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  birth_date: z.string().min(1, "Vui lòng chọn ngày sinh"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Vui lòng chọn giới tính",
  }),
});

type CreateMemberFormValues = z.infer<typeof createMemberSchema>;

export const CreateMemberForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateMemberFormValues>({
    resolver: zodResolver(createMemberSchema),
  });

  const onSubmit = async (data: CreateMemberFormValues) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm thành viên");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("members").insert({
        ...data,
        user_id: user.id,
      });

      if (error) throw error;

      toast.success("Thêm thành viên thành công!");
      onSuccess();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm thành viên");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Nhập tên thành viên"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          type="date"
          {...register("birth_date")}
        />
        {errors.birth_date && (
          <p className="text-sm text-red-500 mt-1">{errors.birth_date.message}</p>
        )}
      </div>

      <div>
        <Select onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn giới tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Nam</SelectItem>
            <SelectItem value="female">Nữ</SelectItem>
            <SelectItem value="other">Khác</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Đang xử lý..." : "Thêm thành viên"}
      </Button>
    </form>
  );
};
