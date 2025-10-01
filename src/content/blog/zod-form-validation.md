---
pubDatetime: 2024-06-16
title: "Zod와 react-hook-form을 사용한 form validation"
description: "Form Validation 방법"
tags: ["javascript", "react", "zod", "react-hook-form"]
ogImage: ../../assets/images/zod.png
---

## React Hook Form과 Zod를 이용한 폼 검증

### 패키지 설치

먼저, 필요한 패키지를 설치합니다:

```bash
npm i react-hook-form
```

### 기본 폼 생성

React Hook Form을 이용하여 책의 이름, 저자, 출간일을 입력받는 기본 폼을 작성해보겠습니다:

```tsx
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type FormFields = {
  name: string;
  author: string;
  year: string;
};

export default function BookForm() {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = data => {
    // API 호출
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="이름" {...register("name")} />
      <Input placeholder="저자" {...register("author")} />
      <Input placeholder="출간일" {...register("year")} />
      <Button type="submit">등록</Button>
    </form>
  );
}
```

위 코드는 기본적인 폼을 정의합니다. 이제 각 필드에 필수 조건과 유효성 검사를 추가해보겠습니다.

### 폼 유효성 검사 추가

이름, 저자, 출간일이 필수이며, 저자는 12자 이내로 제한하는 조건을 추가합니다:

```tsx
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type FormFields = {
  name: string;
  author: string;
  year: string;
};

export default function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = data => {
    // API 호출
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="이름"
        {...register("name", { required: "이름을 입력해주세요." })}
      />
      {errors.name && <div>{errors.name.message}</div>}
      <Input
        placeholder="저자"
        {...register("author", {
          required: "저자를 입력해주세요.",
          maxLength: { value: 12, message: "12자 이내로 입력해주세요." },
        })}
      />
      {errors.author && <div>{errors.author.message}</div>}
      <Input
        placeholder="출간일"
        {...register("year", { required: "출간일을 입력해주세요." })}
      />
      {errors.year && <div>{errors.year.message}</div>}
      <Button type="submit">등록</Button>
    </form>
  );
}
```

이제 필드가 존재하지 않거나 유효성 검사에 실패할 경우 적절한 에러 메시지를 표시합니다.

### Zod와 @hookform/resolvers를 이용한 스키마 검증

마지막으로, Zod를 이용한 스키마 검증을 추가해보겠습니다. 이를 위해 Zod와 @hookform/resolvers 패키지를 사용합니다.

```tsx
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  author: z
    .string()
    .max(12, { message: "12자 이하로 작성해주세요." })
    .min(1, { message: "저자는 필수입니다." }),
  year: z.string().min(1, { message: "출간일은 필수입니다." }),
});

type FormFields = z.infer<typeof schema>;

export default function BookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = data => {
    console.log(data);
    // API 호출
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="이름" {...register("name")} />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <Input placeholder="저자" {...register("author")} />
      {errors.author && (
        <div className="text-red-500">{errors.author.message}</div>
      )}
      <Input placeholder="출간일" {...register("year")} />
      {errors.year && <div className="text-red-500">{errors.year.message}</div>}
      <Button type="submit">등록</Button>
    </form>
  );
}
```

이제 Zod를 통해 유효성 검사를 수행하고, 오류 메시지를 표시합니다. 이러한 접근 방식은 폼 검증을 보다 간결하고 유지보수하기 쉽게 만들어줍니다.

### 결론

React Hook Form과 Zod를 함께 사용하여 폼 유효성 검사를 효율적으로 처리할 수 있습니다. 이 방법은 코드의 가독성을 높이고 유지보수를 쉽게 해줍니다. 필요에 따라 추가적인 유효성 검사 조건을 Zod 스키마에 간단히 추가할 수 있습니다.
