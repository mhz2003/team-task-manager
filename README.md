# Team Task Manager

اپلیکیشن مدیریت پروژه و وظایف تیمی. React + TypeScript + Vite، استایل با Sass (CSS Modules)، داده‌ها روی localStorage ذخیره میشن.

## راه‌اندازی
```bash
npm install
npm run dev
```

## ساختار پروژه
```
src/
  types/        اینترفیس‌های User, Project, Task, TaskFilters
  utils/        localStorage helpers, تاریخ، تولید id
  styles/       رنگ‌ها و توکن‌های طراحی (variables.scss, mixins.scss, global.scss)
  context/      AuthContext, DataContext, ThemeContext
  hooks/        useLocalStorage, useDueReminders
  components/
    common/     Modal, Toast, Badge, FormElements
    layout/     Navbar, ProtectedRoute, ThemeToggle
    auth/       LoginForm, RegisterForm
    users/      UserForm, UserList, UserCard
    projects/   ProjectForm, ProjectList, ProjectCard
    tasks/      TaskForm, TaskList, TaskCard, TaskFilters
  pages/        هر صفحه، کامپوننت‌ها رو کنار هم می‌چینه
```

هر کامپوننت فایل خودش رو داره و یک فایل `.module.scss` هم‌نام برای استایلش. رنگ‌های تم (روشن/تیره) با CSS variable هستن، توی `global.scss` تعریف شدن، بقیه‌ی فایل‌ها فقط `var(--x)` استفاده می‌کنن.

## تم تیره
دکمه‌ی toggle توی navbar هست، انتخاب کاربر توی localStorage ذخیره میشه و اگه چیزی ذخیره نشده باشه از تنظیمات سیستم می‌خونه.

## یادآور سررسید
هوک `useDueReminders` (توی `src/hooks`) هر چند دقیقه یک بار تسک‌های خود کاربر لاگین‌شده رو چک می‌کنه؛ اگه چیزی نزدیک سررسیدشه یا گذشته، یک toast نشون میده. هر تسک فقط یک بار در طول سشن نوتیف میشه که اسپم نشه.

 
