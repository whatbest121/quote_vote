# Quote Voting System Frontend

## Overview
ระบบโหวตคำคมที่พัฒนาด้วย Next.js, TypeScript, และ TanStack Query โดยเชื่อมต่อกับ API backend

## Features
- ✅ แสดงรายการคำคมจาก API
- ✅ ระบบค้นหาคำคม
- ✅ ระบบโหวตคำคม (โหวตได้ 1 ครั้งต่อคำคม)
- ✅ ยกเลิกการโหวต
- ✅ ไม่สามารถโหวตคำคมของตัวเองได้
- ✅ สร้างคำคมใหม่
- ✅ การเรียงลำดับ (ใหม่ล่าสุด, เก่าที่สุด, ยอดนิยม)
- ✅ UI ที่สวยงามและ responsive
- ✅ ระบบ Authentication และ User Management
- ✅ Header Navigation และ Logout System

## Authentication & User Management

### การดึง User ID
ระบบใช้ JWT token และ API `/users/profile` เพื่อดึงข้อมูล user:

```typescript
// ใช้ useCurrentUser hook
import { useCurrentUser } from '@/hooks/useCurrentUser';

const { userId, isAuthenticated, user } = useCurrentUser();
```

### User Data Flow
1. **Login**: เก็บ JWT token ใน localStorage
2. **Token Validation**: ตรวจสอบ token เมื่อโหลดแอป
3. **Profile Fetch**: ดึงข้อมูล user จาก `/users/profile` API
4. **User ID**: ใช้ `user._id` สำหรับการโหวตและตรวจสอบ

### Logout System
- **ปุ่ม Logout**: แสดงใน header เมื่อเข้าสู่ระบบแล้ว
- **Token Removal**: ลบ JWT token จาก localStorage
- **User Data Clear**: ล้างข้อมูล user จาก cache
- **Redirect**: กลับไปหน้าแรกหลัง logout

### API Endpoints
- `POST /auth/login` - เข้าสู่ระบบ
- `GET /users/profile` - ดึงข้อมูล user profile
- `POST /vote/{quote_id}` - โหวตคำคม
- `POST /vote/cancelVot/{quote_id}` - ยกเลิกการโหวต
- `GET /vote/has-voted/{quote_id}` - ตรวจสอบการโหวต

## Voting System

### กฎการโหวต
- **1 User = 1 โหวตต่อคำคม**: ผู้ใช้แต่ละคนสามารถโหวตได้เพียง 1 ครั้งต่อคำคม
- **ไม่โหวตคำคมตัวเอง**: ผู้ใช้ไม่สามารถโหวตคำคมของตัวเองได้
- **ยกเลิกการโหวตได้**: ผู้ใช้สามารถยกเลิกการโหวตได้
- **ต้องเข้าสู่ระบบ**: เฉพาะผู้ใช้ที่เข้าสู่ระบบเท่านั้นที่สามารถโหวตได้

### สถานะการโหวต
- **ยังไม่โหวต**: แสดงปุ่ม "โหวต" (สีเขียว)
- **โหวตแล้ว**: แสดงปุ่ม "ยกเลิกโหวต" (สีแดง, ไอคอนหัวใจ)
- **คำคมตัวเอง**: ไม่แสดงปุ่มโหวต, แสดงแบนเนอร์ "คำคมของคุณ"
- **ไม่ได้เข้าสู่ระบบ**: ไม่แสดงปุ่มโหวต

## API Integration

### Quote Services
- `useGetQuote` - ดึงรายการคำคมแบบ paginated
- `useCreateQuote` - สร้างคำคมใหม่
- `useEditQuote` - แก้ไขคำคม
- `useDeleteQuote` - ลบคำคม

### Vote Services
- `useVote` - โหวตคำคม
- `useHasVoted` - ตรวจสอบว่าโหวตแล้วหรือยัง
- `useCancelVote` - ยกเลิกการโหวต
- `useCheckVote` - ตรวจสอบสถานะการโหวต

### User Services
- `useGetProfile` - ดึงข้อมูล user profile
- `useCurrentUser` - Custom hook สำหรับจัดการ user data

## Components

### Header (`Header.tsx`)
คอมโพเนนต์ header ที่แสดง navigation และ user controls

**Features:**
- **Logo/Brand**: แสดงชื่อแอปและไอคอน
- **Navigation**: ลิงก์ไปยังหน้าต่างๆ
- **User Info**: แสดงชื่อผู้ใช้เมื่อเข้าสู่ระบบ
- **Login/Register**: ปุ่มเข้าสู่ระบบและสมัครสมาชิก
- **Logout**: ปุ่มออกจากระบบพร้อม clear data
- **Settings**: ปุ่มตั้งค่า (สำหรับอนาคต)
- **Responsive**: ปรับตัวตามขนาดหน้าจอ

### Dashboard (`dashboead.tsx`)
คอมโพเนนต์หลักที่แสดงรายการคำคมและจัดการการโต้ตอบทั้งหมด

**Features:**
- แสดงคำคมในรูปแบบ grid cards
- ระบบค้นหาแบบ real-time
- ฟิลเตอร์ตามหมวดหมู่
- การเรียงลำดับ
- สร้างคำคมใหม่ (เฉพาะผู้ใช้ที่เข้าสู่ระบบ)
- ส่ง currentUserId ไปยัง QuoteCard
- แสดงข้อความแนะนำให้เข้าสู่ระบบ
- รวม Header component

### QuoteCard (`QuoteCard.tsx`)
คอมโพเนนต์สำหรับแสดงคำคมแต่ละรายการ

**Features:**
- แสดงเนื้อหาคำคม
- ตรวจสอบการโหวตของ user
- แสดงปุ่มโหวต/ยกเลิกโหวตตามสถานะ
- ไม่แสดงปุ่มโหวตสำหรับคำคมของตัวเอง
- Loading states
- Error handling

## Hooks

### useCurrentUser
Custom hook สำหรับจัดการข้อมูล user:

```typescript
const {
  isAuthenticated,  // สถานะการเข้าสู่ระบบ
  user,            // ข้อมูล user จาก API
  userId,          // User ID สำหรับการโหวต
  username,        // Username
  isLoading,       // Loading state
  refetchProfile,  // ฟังก์ชันดึงข้อมูลใหม่
  clearUserData    // ฟังก์ชันล้างข้อมูล
} = useCurrentUser();
```

### useGetProfile
Hook สำหรับดึงข้อมูล user profile:

```typescript
const { data: profile, refetch, isLoading } = useGetProfile();
```

## Usage

### การใช้งาน Header
```tsx
import Header from '@/components/Header';

// ใน layout หรือ page component
<Header />
```

### การใช้งาน Dashboard
```tsx
import QuoteVotingSystem from '@/components/dashboead';

// ใน page component
<QuoteVotingSystem />
```

### การใช้งาน QuoteCard
```tsx
import { QuoteCard } from '@/components/dashboad/QuoteCard';

<QuoteCard 
  quote={quoteData} 
  chckVote={isAuthenticated}
  currentUserId={userId}
/>
```

### การใช้งาน useCurrentUser
```tsx
import { useCurrentUser } from '@/hooks/useCurrentUser';

function MyComponent() {
  const { userId, isAuthenticated } = useCurrentUser();
  
  if (!isAuthenticated) {
    return <div>กรุณาเข้าสู่ระบบ</div>;
  }
  
  return <div>User ID: {userId}</div>;
}
```

### การใช้งาน Logout
```tsx
import { useAuth } from '@/authentication/hook';
import { useCurrentUser } from '@/hooks/useCurrentUser';

function LogoutButton() {
  const { logout } = useAuth();
  const { clearUserData } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await logout();
      clearUserData();
      // Redirect หรือ refresh page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button onClick={handleLogout}>
      ออกจากระบบ
    </Button>
  );
}
```

## State Management
ใช้ TanStack Query สำหรับ:
- Caching API responses
- Automatic refetching
- Optimistic updates
- Error handling
- Invalidate queries เมื่อมีการโหวต/ยกเลิกโหวต

## Authentication Integration

### การตั้งค่า currentUserId
```tsx
// ใน dashboard component
const { userId, isAuthenticated } = useCurrentUser();

// ส่งไปยัง QuoteCard
<QuoteCard 
  currentUserId={userId || undefined}
  chckVote={isAuthenticated}
  // ... other props
/>
```

### การตรวจสอบการโหวต
```tsx
// ใน QuoteCard component
const { data: hasVotedData, isLoading: hasVotedLoading } = useHasVoted(quote._id);
const isOwnQuote = currentUserId && quote.user_id === currentUserId;
```

## Styling
ใช้ Tailwind CSS และ shadcn/ui components สำหรับ:
- Responsive design
- Modern UI components
- Consistent styling
- Dark/light mode support
- Hover effects และ transitions
- Sticky header navigation

## Development

### การรันโปรเจค
```bash
npm install
npm run dev
```

### การ build
```bash
npm run build
```

### การตรวจสอบ TypeScript
```bash
npm run type-check
```

## API Response Structure

### Quote Object
```typescript
interface Quote {
  _id: string;
  user_id: string;
  quote: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
```

### User Data
```typescript
interface UserData {
  _id: string;
  username: string;
}
```

### HasVoted Response
```typescript
interface HasVotedResponse {
  hasVoted: boolean;
}
```

### Paginated Response
```typescript
interface PaginatedQuoteResponse {
  docs: Quote[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

## Error Handling
- Loading states สำหรับทุก API calls
- Error boundaries สำหรับการจัดการข้อผิดพลาด
- User-friendly error messages
- Retry mechanisms
- Graceful fallbacks สำหรับการตรวจสอบการโหวต
- Authentication error handling
- Logout error handling

## Performance Optimizations
- React.memo สำหรับ components
- useMemo สำหรับ expensive calculations
- useCallback สำหรับ event handlers
- TanStack Query caching
- Image optimization
- Code splitting
- Optimistic updates สำหรับการโหวต
- Conditional rendering สำหรับ authenticated features
- Sticky header performance

## Security Considerations
- ตรวจสอบ user authentication ก่อนการโหวต
- ป้องกันการโหวตซ้ำ
- ป้องกันการโหวตคำคมของตัวเอง
- Server-side validation สำหรับการโหวต
- JWT token validation
- Secure token storage
- API endpoint protection
- Secure logout process
- Token cleanup on logout
