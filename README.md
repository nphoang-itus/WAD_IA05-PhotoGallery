# Picsum Photo Gallery
Bài tập cá nhân IA05 môn Phát triển ứng dụng Web của thầy Nguyễn Huy Khánh
## Đề bài
Build a React app that fetches and displays a list of photos from the Lorem Picsum API. When a user clicks on a photo, a detailed view of that photo, including its title, author, and description, should be shown.

#### **Requirements:**

1. **Display a Grid/List of Photos:**  
   * Fetch a list of photos from https://picsum.photos/ using their public API.  
   * Display the photos in a responsive grid or list view on the page.  
   * Each photo should display a thumbnail (a small version of the image) and the author’s name.  
2. **Infinite Scroll (Scroll to Load More):**  
   * As the user scrolls down the page, loads more photos automatically from the Lorem Picsum API.  
   * Use pagination or the "page" parameter from the Lorem Picsum API to fetch additional pages of photos.  
   * Add a loading indicator that shows when new photos are being fetched.  
   * Handle cases where there are no more photos to load (end of list).  
3. **View Photo Details on Click:**  
   * When a user clicks on any photo, navigate to a detailed view of that specific photo.  
   * In the detailed view, show the following:  
     * The full-size image.  
     * The photo title (if available) or placeholder text.  
     * The author’s name.  
     * The photo description (if available) or placeholder text.  
4. **Navigation and Routing:**  
   * Use React Router or an equivalent library for navigation between the list of photos and the detailed photo view.  
   * Implement appropriate URLs such as `/photos` for the list and `/photos/:id` for the detailed view.  
5. **API Integration:**  
   * Use the official API endpoint to retrieve the list of photos and individual photo details.  
   * Handle loading states and errors appropriately while fetching data.  
6. **Styling and Responsiveness:**  
   * The UI should be responsive for both desktop and mobile screens.  
   * Add some basic styling, but the emphasis is more on functionality than appearance. Use a CSS framework like Tailwind, Bootstrap, Material UI.

---

## Rubric:

| Criteria | Description | Point |
| ----- | ----- | ----- |
| **API Integration** | Successfully fetches data from the Lorem Picsum API, handles loading and error states well. | 1 |
| **Photo Grid/List Display** | Displays photos in a responsive, well-styled grid/list with author info. | 2 |
| **Infinite Scroll** | Infinite scroll works smoothly, with seamless loading of new photos and clear loading indicators. | 1 |
| **Photo Details View** | Displays full photo, title, author, and description. Provides a good user experience. | 2 |
| **Routing and Navigation** | URLs are intuitive and functional. | 1 |
| **Styling and Responsiveness** | The app is well-designed, fully responsive across devices, with additional style considerations. | 1 |
| **Code Quality** | Code is well-organized, with comments, reusable components, and follows React best practices. | 1 |
| **Public hosting** | Upload to a public host | 1 |

#### 



## Hướng dẫn cài đặt

### 1. Clone repository
```bash
git clone https://github.com/nphoang-itus/WAD_IA05-PhotoGallery.git
cd WAD_IA05-PhotoGallery/picsum-gallery
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy ứng dụng
```bash
npm run dev
```
- Ứng dụng sẽ chạy tại [http://localhost:5173](http://localhost:5173).

---

## Cấu trúc thư mục

```
WAD_IA05-PhotoGallery/
├── picsum-gallery/
│   ├── public/                # File tĩnh (favicon, ảnh, v.v.)
│   ├── src/                   # Mã nguồn chính
│   │   ├── components/        # Các component dùng chung
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Các trang chính
│   │   ├── services/          # Hàm gọi API
│   │   ├── App.jsx            # Thành phần gốc của ứng dụng
│   │   ├── main.jsx           # Điểm khởi động ứng dụng
│   ├── package.json           # Thông tin dự án và dependencies
│   ├── vite.config.js         # Cấu hình Vite
│   └── README.md              # Hướng dẫn sử dụng
```

# Hướng dẫn cài đặt chi tiết từ A-Z

## Khởi tạo project và Cài đặt React Router

### 1. Khởi tạo React Project

- Tạo dự án React mới bằng Vite (nhanh hơn `create-react-app`):
    
    ```bash
    npm create vite@latest picsum-gallery -- --template react
    ```
    
- Cài đặt packages phụ thuộc mặc định (Thường vite sẽ tự cài đặt, nên chỉ thực hiện lệnh dưới nếu vite không cài sẵn)
    
    ```bash
    cd picsum-gallery
    npm install
    ```
    

### 2. Cài đặt framework cần thiết

- Cài React Router cho việc điều hướng API và Axios cho việc gọi API (có thể thay thế bằng fetch)
    
    ```bash
    npm install react-roauter-dom axios
    ```
    
- Cài Material UI cho giao diện
    
    ```bash
    npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
    ```
    

### 3. Cấu hình MUI

#### Thêm Font

Mở `index.html` ở root directory thêm `<link>` sau trong thẻ `<head>`

```html
<head>
  <title>Picsum Gallery</title>

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
</head>
```

- Font Roboto là font mặc định của MUI → có thể thay đổi bằng font khác

#### Thêm `CssBaseLine`

- `CssBaseLine` là một component của MUI giúp chuẩn hoá CSS như `normalize.css` trên các trình duyệt
- Mở `src/main.jsx` và cập nhật để bọc toàn bộ ứng dụng bằng `BrowserRouter` và `CssBaseLine`
    
    ```jsx
    // src/main.jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // Xóa nội dung file này nếu bạn không dùng CSS thuần
    
    import { BrowserRouter } from 'react-router-dom'; // 1. Import Router
    import CssBaseline from '@mui/material/CssBaseline'; // 2. Import CssBaseline
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        {/* 3. Bọc toàn bộ App bằng Router */}
        <BrowserRouter>
          <CssBaseline /> {/* 4. Thêm CssBaseline để chuẩn hóa CSS */}
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    ```
    
- Vì `CssBaseLine` đã được thiết lập ⇒ Có thể xoá file `src/index.css`

### 4. Thiết lập React Routrer

Tạo 2 Pages và định nghĩa Routers theo yêu cầu

#### Tạo các Pages

- Tạo `src/pages`
- Tạo 2 file trong `src/pages`:
    - `PhotoListPage.jsx`
    - `PhotoDetailPage.jsx`
- Tạo placeholder code sử dụng component MUI để check:
    
    ```jsx
    // src/pages/PhotoListPage.jsx
    import React from 'react';
    import { Container, Typography, Box } from '@mui/material';
    
    const PhotoListPage = () => {
      return (
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Đây là Trang Danh sách Ảnh
            </Typography>
            <Typography>
              (Sử dụng MUI Grid và Cardcor 'để hiển thị ảnh ở đây)
            </Typography>
          </Box>
        </Container>
      );
    };
    
    export default PhotoListPage;
    ```
    
    ```jsx
    // src/pages/PhotoDetailPage.jsx
    import React from 'react';
    import { Container, Typography, Box } from '@mui/material';
    
    const PhotoDetailPage = () => {
      return (
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Đây là Trang Chi tiết Ảnh
            </Typography>
            <Typography>
              (Hiển thị ảnh full-size và thông tin chi tiết ở đây)
            </Typography>
          </Box>
        </Container>
      );
    };
    
    export default PhotoDetailPage;
    ```
    

#### Định nghĩa Routers

Các routers sẽ được định nghĩa trong src/App.jsx nên xoá code mặc định và thay thế bằng code sau để thiết lập routers:

```jsx
// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import PhotoListPage from './pages/PhotoListPage';
import PhotoDetailPage from './pages/PhotoDetailPage';

function App() {
  return (
    <Routes>
      {/* Yêu cầu: Trang danh sách tại /photos  */}
      <Route path="/photos" element={<PhotoListPage />} />

      {/* Yêu cầu: Trang chi tiết tại /photos/:id  */}
      <Route path="/photos/:id" element={<PhotoDetailPage />} />

      {/* (Nên có) Tự động chuyển hướng từ trang chủ "/" đến "/photos" */}
      <Route path="/" element={<Navigate replace to="/photos" />} />
    </Routes>
  );
}

export default App;
```

### 5. Khởi tạo project để kiểm tra kết quả

```jsx
npm run dev
```

- Màn hình chính → tự động router sang [`localhost:5173/photos`](http://localhost:5173/photos) tương ứng code `PhotoListPage.jsx`
    
- Khi chuyển sang đường dẫn khác có dạng `localhost:5173/photos/{:id}`  như `localhost:5173/photos/1`  hay `localhost:5173/photos/123`  thì nó chuyển sang router chi tiết tương ứng `PhotoDetailPage.jsx`
    

---

## Xây dựng Trang Danh sách Ảnh (Photo List)

### Component Loader

> Component tái sử dụng để hiển thị loading ở giữa màn hình
> 
- Vị trí: `src/components/Loader.jsx`

```jsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 4, // margin-top = margin-bottom = 4
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;

```

### Component PhotoCard

> Hiển thị từng bức ảnh trong lưới dưới dạng thumnail, tên tác giả và có thể nhấn vào để đến trang chi tiết
> 
- Vị trí: `src/components/PhotoCard.jsx`

```jsx
import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo }) => {
  return (
    <Grid
      sx={{
        gridColumn: {
          xs: "span 12", // Chiếm toàn bộ cột trên màn hình nhỏ
          sm: "span 6", // Chiếm 6 cột trên màn hình nhỏ
          md: "span 4", // Chiếm 4 cột trên màn hình trung bình
          lg: "span 3", // Chiếm 3 cột trên màn hình lớn
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          textDecoration: "none",
        }}
        component={Link}
        to={`/photos/${photo.id}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={photo.download_url}
          alt={photo.author}
        />
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {photo.author}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PhotoCard;
```

### Cập nhật PhotoListPage.jsx

> Gọi API và hiển thị mọi thứ
> 

```jsx
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Container, Typography, Grid, Alert, useStepContext } from "@mui/material";
import PhotoCard from "../components/PhotoCard";
import Loader from "../components/Loader";

const PhotoListPage = () => {
  // State để lưu danh sách ảnh
  const [photos, setPhotos] = useState([]);
  // State để quản lý trạng thái tải
  const [loading, setLoading] = useState(false);
  // State để quản lý lỗi
  const [error, setError] = useState(null);
  // State để theo dõi trang hiện tại (cho bước Infinite Scroll sau này)
  const [page, setPage] = useState(1)

  // Dùng useEffect để gọi API khi component được tải lần đầu
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true); // Bat dau tai
      setError(null); // Xoa loi cu

      try {
        // Goi API cua Picsum de lay danh sach: Lay 20 anh cho trang 1
        const response = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        setPhotos(response.data);
      } catch (err) {
        // Xu ly loi khi call api fail
        console.error(err);
      } finally {
        // Dung tai (du fail hay success)
        setLoading(false)
      }
    };

    fetchPhotos(); // Goi ham fetch
  },
  [page] // chi chay lai khi 'page' thay doi (hien chi chay 1 lan)
);
  
  // -- render content --
  // neu co loi, hien thi thong bao loi
  if (error && photos.length === 0) {
    return (
      <Container
        maxWidth='md'
        sx={{
          py: 4
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        py: 4
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Thư viện ảnh Picsum
      </Typography>
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo}/>
        ))}
      </Grid>
      
      {/* Hiển thị loader nếu đang tải  */}
      {loading && <Loader/>}
    </Container>
  );
};

export default PhotoListPage;
```

Lưu lại và kiểm tra trình duyệt

1. Một `Loader` (hình tròn xoay) xuất hiện trong giây lát.
2. Tiêu đề "Thư viện ảnh Picsum".
3. Một lưới ảnh (grid) responsive hiển thị 20 bức ảnh đầu tiên, mỗi ảnh có tên tác giả.
4. Nếu bạn nhấp vào bất kỳ ảnh nào, bạn sẽ được chuyển đến trang `PhotoDetailPage` (vẫn đang là placeholder).

---

## Triển khai Infinite Scroll

> Triển khai bằng cách dùng Intersection Observer API
> 

Cách hoạt động:

1. Đặt một thẻ trigger ở cuối danh sách ảnh (thẻ `<div>` rỗng)
2. DÙng Observer để quan sát thẻ trigger đó
3. Khi người dùng cuộc và thẻ trigger bắt đầu xuất hiện trên màn hình (isIntersecting), tăng số trang (state `page`) lên 1
4. Việc `page` thay đổi sẽ tự động kích hoạt `useEffect` để tải thêm ảnh
5. Ảnh mới sẽ được nối vào danh sách ảnh cũ
6. Thêm một state hasMore để dừng việc tải khi API trả về một mảng rỗng (hết ảnh)

---

Logic này dựa trên một API của trình duyệt gọi là **`IntersectionObserver`**.

> Tưởng tượng đơn giản: Bạn thuê một người bảo vệ (IntersectionObserver) và đưa cho anh ta một cái ghế (<div ref={...} />) đặt ở cuối trang. Bạn ra lệnh: "Khi nào cái ghế này lọt vào tầm mắt của người dùng (vì họ cuộn xuống), hãy báo cho tôi biết!".
> 

Đây là cách chúng ta cài đặt "người bảo vệ" đó trong React.

---

#### 1. Thêm State mới: `hasMore`

```jsx
const [hasMore, setHasMore] = useState(true);
```

- **Lý do:** Chúng ta cần một biến để biết khi nào nên dừng. Khi API của Picsum trả về một mảng rỗng (`[]`), nghĩa là đã hết ảnh. Chúng ta sẽ đặt `hasMore` thành `false` để "người bảo vệ" biết là không cần gọi chúng ta nữa.

---

#### 2. "Cái Hộp" để giữ Người Bảo Vệ: `useRef`

```jsx
const observer = useRef();
```

- **Lý do:** Chúng ta cần một nơi để lưu trữ "người bảo vệ" (`IntersectionObserver`) của mình.
- **Tại sao không dùng `useState`?** Vì việc thay đổi `observer` không cần khiến component bị render lại. `useRef` giống như một cái hộp, bạn có thể bỏ đồ vào (`observer.current = ...`) và nó sẽ ở đó vĩnh viễn (giữa các lần render) mà không kích hoạt render lại.

---

#### 3. Hàm Logic Cốt lõi: `useCallback`

Đây là phần phức tạp nhất. Đây chính là bản hướng dẫn chúng ta đưa cho "người bảo vệ".

```jsx
const lastPhotoElementRef = useCallback(node => {
    if (loading) return; // 1. Nếu đang tải, không làm gì cả

    // 2. Ngắt kết nối "người bảo vệ" cũ (nếu có)
    if (observer.current) observer.current.disconnect();

    // 3. Tạo "người bảo vệ" mới
    observer.current = new IntersectionObserver(entries => {
      
      // 4. Khi mục tiêu (node) xuất hiện VÀ còn ảnh
      if (entries[0].isIntersecting && hasMore) {
        
        // 5. Báo cho React biết: "Tải trang tiếp theo!"
        setPage(prevPage => prevPage + 1);
      }
    });

    // 6. Nếu "cái ghế" (node) tồn tại, hãy bắt đầu theo dõi nó
    if (node) observer.current.observe(node);
    
}, [loading, hasMore]); // 7. Phụ thuộc
```

Hãy chia nhỏ nó ra:

1. **`useCallback(..., [deps])`:** Chúng ta bọc logic này trong `useCallback` để React "nhớ" hàm này. Nó sẽ không bị tạo lại mỗi lần component render, trừ khi `loading` hoặc `hasMore` thay đổi. Điều này rất quan trọng để tối ưu hiệu suất.
2. **`node => {...}`:** Đây là một "callback ref". Khi chúng ta viết `<div ref={lastPhotoElementRef} />` (ở bước 5), React sẽ tự động gọi hàm này và truyền chính phần tử `<div>` đó vào làm đối số `node`. `node` chính là "cái ghế".
3. **`if (loading) return;`**: Đây là một chốt an toàn. Nếu chúng ta đang tải trang 3, chúng ta không muốn người dùng cuộn lên cuộn xuống và vô tình kích hoạt tải trang 4, 5, 6...
4. **`observer.current.disconnect()`**: Dọn dẹp. Trước khi tạo một "người bảo vệ" mới, chúng ta phải cho "người bảo vệ" cũ nghỉ việc (ngắt kết nối) để tránh rò rỉ bộ nhớ.
5. **`new IntersectionObserver(...)`**: Đây là lúc chúng ta thuê "người bảo vệ" mới và đưa cho anh ta một hàm callback (một mệnh lệnh).
6. **`if (entries[0].isIntersecting && hasMore)`**: Mệnh lệnh chính!
    - `entries[0].isIntersecting`: Trả về `true` nếu "cái ghế" (`node`) đang ở trong màn hình.
    - `&& hasMore`: Chỉ thực hiện nếu chúng ta *biết* là vẫn còn ảnh để tải.
7. **`setPage(prevPage => prevPage + 1)`**: Đây là hành động kích hoạt. Chúng ta tăng số trang lên 1.
8. **`if (node) observer.current.observe(node)`**: Nếu "cái ghế" (`node`) thực sự tồn tại, chúng ta ra lệnh cho "người bảo vệ" (`observer.current`) bắt đầu theo dõi nó.
9. **`[loading, hasMore]`**: Mảng phụ thuộc. Nếu `loading` hoặc `hasMore` thay đổi, React sẽ tạo lại hàm `useCallback` này với giá trị mới nhất của chúng.

---

#### 4. Cập nhật Logic Tải ảnh (`fetchPhotos` và `useEffect`)

```jsx
const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );

      if (response.data.length === 0) {
        // 1. Hết ảnh
        setHasMore(false);
      } else {
        // 2. Nối ảnh mới vào danh sách cũ
        setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
      }
    } catch (err) { /* ... */ }
    setLoading(false);
}, [page]); // 3. Chỉ tạo lại hàm này khi 'page' thay đổi

useEffect(() => {
    fetchPhotos();
}, [fetchPhotos]); // 4. Chỉ chạy khi hàm 'fetchPhotos' thay đổi
```

1. **Hết ảnh:** Nếu API trả về mảng rỗng, chúng ta đặt `setHasMore(false)`. Điều này sẽ chặn `IntersectionObserver` gọi `setPage` ở bước 3.
2. **Nối ảnh:** Đây là thay đổi quan trọng. Chúng ta không dùng `setPhotos(response.data)` nữa. Chúng ta dùng `setPhotos(prevPhotos => [...prevPhotos, ...response.data])` để lấy danh sách ảnh *cũ* và **nối** danh sách ảnh *mới* vào cuối.
3. **`useCallback(..., [page])`**: Chúng ta bọc `fetchPhotos` trong `useCallback` và cho nó phụ thuộc vào `page`. Nghĩa là: hàm `fetchPhotos` này sẽ chỉ thay đổi (được tạo mới) khi giá trị `page` thay đổi.
4. **`useEffect(..., [fetchPhotos])`**: `useEffect` này theo dõi chính hàm `fetchPhotos`. Khi `page` thay đổi (ở bước 3), `fetchPhotos` sẽ thay đổi (ở bước 4.3), và `useEffect` này sẽ chạy `fetchPhotos` mới (với số trang mới).

---

#### 5. Gắn "Cái Ghế" (Trigger) vào Giao diện (Render)

```jsx
  return (
    <Container ...>
      {/* ... Tiêu đề ... */}
      
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </Grid>
      
      {/* ĐÂY LÀ "CÁI GHẾ" (TRIGGER) VÔ HÌNH */}
      <div ref={lastPhotoElementRef} />

      {/* Chỉ báo tải */}
      {loading && <Loader />}
      
      {/* Thông báo khi hết ảnh */}
      {!loading && !hasMore && (
        <Typography ...>
          Bạn đã xem hết ảnh.
        </Typography>
      )}
    </Container>
  );
```

- **`<div ref={lastPhotoElementRef} />`**: Đây là "cái ghế" vô hình. Khi React render thẻ `<div>` này, nó sẽ gọi hàm `lastPhotoElementRef` (ở bước 3) và truyền `div` này vào làm `node`.
- **`!loading && !hasMore`**: Thông báo "Hết ảnh" chỉ hiển thị khi: không đang tải VÀ không còn ảnh để tải.

---

## Xây dựng Photo Detail

### Update file `src/pages/PhotoDetailPage.jsx`

#### Lấy id từ url

- Sử dụng `usePrams` để lấy id của từng ảnh. Ví dụ khi click vào `/photo/123` thì param sẽ là `{ id: 123 }`

```jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const PhotoDetailPage = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Đây là Trang Chi tiết Ảnh {id}
        </Typography>
        <Typography>
          (Hiển thị ảnh full-size và thông tin chi tiết ở đây)
        </Typography>
      </Box>
    </Container>
  );
};

export default PhotoDetailPage;
```

#### Cài đặt State

Cần 3 biến state để quản lý:

1. `photo`: Lưu thông tin chi tiết của ảnh (sau khi call api)
2. `loading`: Biết khi nào đang tải (hiển thị Loading)
3. `error`: Hiển thị thông báo lỗi khi call API fail

```jsx
// ...
const PhotoDetailPage = () => {
  const { id } = useParams(); 

  // 2. CÀI ĐẶT STATE
  const [photo, setPhoto] = useState(null); // Ban đầu chưa có ảnh, nên là 'null'
  const [loading, setLoading] = useState(false); // Ban đầu chưa tải
  const [error, setError] = useState(null); // Ban đầu chưa có lỗi
  
  // (Code tiếp theo sẽ ở đây)
  
  return (
     // ... (phần return cũ)
  );
};
// ...
```

#### Lấy Data từ API

- Dùng id để call API của Picsum. Dùng useEffect để tự động chạy component được tải
- API Endpoint mới: Lấy chi tiết 1 ảnh, API Picsum là: `https://picsum.photos/id/{id}/info`

```jsx
// ...
const PhotoDetailPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 3. GỌI API KHI COMPONENT ĐƯỢC TẢI
  useEffect(() => {
    // Định nghĩa 1 hàm async để gọi API
    const fetchPhotoDetail = async () => {
      setLoading(true); // 1. Bắt đầu tải
      setError(null);   // 2. Xóa lỗi cũ
      
      try {
        // 3. Gọi API bằng 'id' lấy từ URL
        const response = await axios.get(`https://picsum.photos/id/${id}/info`);
        
        // 4. Lưu dữ liệu ảnh vào state
        setPhoto(response.data);
        
      } catch (err) {
        // 5. Nếu có lỗi, lưu lỗi vào state
        setError('Không thể tải thông tin ảnh.');
        console.error(err);
      } finally {
        // 6. (Quan trọng) Dừng tải, dù thành công hay thất bại
        setLoading(false); 
      }
    };

    fetchPhotoDetail(); // Gọi hàm vừa định nghĩa
    
  }, [id]); // 7. Mảng phụ thuộc (dependency array)
  
  // (Phần return sẽ ở đây)
  // ...
};
```

Lưu ý:

- `try … catch … finally`: Cấu trúc chuẩn để xử lý API
    - `try`: chạy code api
    - `catch`: chạy khi try bị lỗi
    - `finally`: luôn luôn chạy cuối để tắt `setLoading(false)`
- `[id]` - mảng phụ thuộc: dòng này nói với react rằng hãy chạy `useEffect` nếu id thay đổi (ví dụ người dùng đang ở trang 123 thì khi nhấn vào trang 456 thì `useEffect` sẽ chạy.

#### Xử lý Render theo 3 trạng thái

Khi chạy chương trình sẽ có 3 trạng thái:

- Đang tải: Hiển thị vòng xoay
- Có lỗi: Thông báo lỗi
- Thành công: hiển thị photo với detail content

```jsx
// ... (toàn bộ code bên trên) ...
  
  // 4. PHẦN RENDER (TRẢ VỀ GIAO DIỆN)

  // TRƯỜNG HỢP 1: ĐANG TẢI
  if (loading) {
    return <Loader />; // Hiển thị vòng xoay
  }

  // TRƯỜNG HỢP 2: CÓ LỖI
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // TRƯỜNG HỢP 3: THÀNH CÔNG (và 'photo' đã có dữ liệu)
  if (!photo) {
    // Nếu không loading, không lỗi, mà cũng không có ảnh (hiếm)
    return null; 
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* (Chúng ta sẽ thêm nội dung chi tiết vào đây) */}
      <Typography variant="h4">Ảnh của: {photo.author}</Typography>
      <img src={photo.download_url} alt={photo.author} style={{ width: '100%' }} />
    </Container>
  );
};
```

#### Hoàn thiện Giao diện chi tiết

Thay phần return để hiển thị MUI với đầy đủ full-size, tác giả, tiêu đề, mô tả placeholder

```jsx
// ... (code bên trên giữ nguyên) ...

  // TRƯỜNG HỢP 3: THÀNH CÔNG
  if (!photo) {
    return null; 
  }
  
  // Đây là phần return cuối cùng (thay thế phần return ở Bước 5)
  return (
    <Container maxWidth="md" sx={{ py: 4 }}> {/* py: 4 là padding top/bottom */}
      
      {/* 1. NÚT QUAY LẠI */}
      <Button 
        component={Link} // Biến Button thành 1 thẻ Link
        to="/photos"     // Trỏ về trang danh sách
        variant="outlined" 
        startIcon={<ArrowBackIcon />} // Thêm icon
        sx={{ mb: 3 }} // margin-bottom
      >
        Quay lại danh sách
      </Button>

      {/* 2. Dùng Paper để tạo 1 cái "khung" đẹp */}
      <Paper elevation={3}>
        
        {/* Yêu cầu: Ảnh full-size */}
        <Box 
          component="img" // Biến Box thành thẻ <img>
          src={photo.download_url}
          alt={photo.author}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '4px 4px 0 0' // Bo góc trên của ảnh
          }}
        />
        
        {/* 3. HỘP CHỨA THÔNG TIN (Tên, Tiêu đề...) */}
        <Box sx={{ p: 3 }}> {/* p: 3 là padding 3 đơn vị */}
          
          {/* Yêu cầu: Tiêu đề (dùng placeholder vì API không có) */}
          <Typography variant="h4" component="h1" gutterBottom>
            Một tác phẩm tuyệt vời
          </Typography>

          {/* Yêu cầu: Tên tác giả */}
          <Typography variant="h6" component="p" color="text.secondary">
            Tác giả: {photo.author}
          </Typography>

          {/* Yêu cầu: Mô tả (dùng placeholder) */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            Đây là mô tả placeholder cho bức ảnh. API của Lorem Picsum
            không cung cấp mô tả, vì vậy chúng ta sẽ hiển thị nội dung này 
            để đáp ứng yêu cầu của bài tập.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            (Kích thước gốc: {photo.width} x {photo.height})
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
```

---

## Hoàn thiện Style và Reponsive

Bổ sung AppBar (thanh tiêu đề) cố định

```jsx
// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import PhotoListPage from './pages/PhotoListPage';
import PhotoDetailPage from './pages/PhotoDetailPage';

// MỚI: Import các component của AppBar
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import 1 icon

function App() {
  return (
    // MỚI: Bọc mọi thứ bằng 1 thẻ <Box>
    <Box>
      {/* MỚI: Thêm AppBar */}
      <AppBar position="static"> {/* 'static' sẽ đẩy nội dung xuống dưới */}
        <Toolbar>
          <PhotoCameraIcon sx={{ mr: 2 }} /> {/* Thêm icon */}
          <Typography variant="h6" component="div">
            Picsum Gallery
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Phần Routes giữ nguyên */}
      <Routes>
        <Route path="/photos" element={<PhotoListPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
        <Route path="/" element={<Navigate replace to="/photos" />} />
      </Routes>
    </Box>
  );
}

export default App;
```

---

## Refactor for Cleancode

Giải thích lại chi tiết file sau khi refactor

### Thư mục gốc: WAD_IA05-PhotoGallery

- **.gitignore**
    
    Danh sách các file/thư mục sẽ bị Git bỏ qua khi commit (ví dụ: node_modules, log, build output...).
    
- [**README.md**](http://readme.md/)
    
    Mô tả tổng quan về project, hướng dẫn sử dụng, tính năng chính.
    
- **picsum-gallery/**
    
    Thư mục chứa toàn bộ mã nguồn chính của ứng dụng React.
    

---

### Thư mục: `picsum-gallery/`

- **.gitignore**
    
    Quy định các file/thư mục không được theo dõi bởi Git trong thư mục này.
    
- [**README.md**](http://readme.md/)
    
    Thông tin về cấu trúc, cách cài đặt, các plugin sử dụng cho project React + Vite.
    
- **eslint.config.js**
    
    Cấu hình ESLint để kiểm tra và chuẩn hóa code JavaScript/React.
    
- **vite.config.js**
    
    Cấu hình cho Vite (công cụ build và dev server cho React).
    
- **package.json**
    
    Khai báo thông tin project, dependencies, scripts (dev, build, lint...).
    
- **index.html**
    
    File HTML gốc, nơi React sẽ được mount vào thẻ `<div id="root"></div>`.
    
- **public/**
    
    (Hiện tại chưa có nội dung, thường dùng để chứa các file tĩnh như ảnh, favicon...)
    
- **src/**
    
    Thư mục chứa toàn bộ mã nguồn React.
    

---

### Thư mục: `src/`

- **App.jsx**
    
    Thành phần gốc của ứng dụng, định nghĩa các route và layout.
    
- **App.css**
    
    File CSS chính cho toàn bộ ứng dụng.
    
- **main.jsx**
    
    Điểm khởi động ứng dụng React, render `<App />` vào DOM.
    
- **assets/**
    
    (Hiện tại chưa có nội dung, thường dùng để chứa ảnh, icon, font...)
    

#### Thư mục: `components/`

Chứa các component dùng lại nhiều lần:

- **AppLayout.jsx**
    
    Layout tổng thể, chứa header và phần nội dung chính.
    
- **Loader.jsx**
    
    Component hiển thị vòng loading và thông báo khi đang tải dữ liệu.
    
- **PhotoCard.jsx**
    
    Component hiển thị một ảnh nhỏ trong danh sách (thumbnail + tên tác giả).
    

#### Thư mục: `hooks/`

Chứa custom React hooks:

- **usePhotoDetail.js**
    
    Hook lấy chi tiết một ảnh theo id (gọi API, quản lý loading/error).
    
- **usePhotoList.js**
    
    Hook lấy danh sách ảnh, hỗ trợ phân trang và infinite scroll.
    

#### Thư mục: `pages/`

Chứa các trang chính của ứng dụng:

- **PhotoListPage.jsx**
    
    Trang hiển thị danh sách ảnh (gallery), dùng infinite scroll.
    
- **PhotoDetailPage.jsx**
    
    Trang chi tiết cho một ảnh (hiển thị ảnh lớn, tác giả, mô tả...).
    

#### Thư mục: `services/`

Chứa các hàm gọi API:

- **picsumApi.js**
Định nghĩa các hàm gọi API Picsum (lấy danh sách ảnh, lấy chi tiết ảnh).

---

Nếu bạn muốn xem chi tiết code của từng file, hãy nhấn vào tên file tương ứng:

- src/App.jsx
- src/hooks/usePhotoDetail.js
- src/hooks/usePhotoList.js
- src/services/picsumApi.js
- src/pages/PhotoListPage.jsx
- src/pages/PhotoDetailPage.jsx
- src/components/PhotoCard.jsx
- src/components/Loader.jsx
- src/components/AppLayout.jsx

---

### Hướng dẫn Deploy

#### 1. Build ứng dụng
Chạy lệnh sau để build ứng dụng:
```bash
npm run build
```
- Kết quả build sẽ nằm trong thư mục `dist/`.

#### 2. Deploy lên dịch vụ hosting
Bạn có thể sử dụng các dịch vụ hosting như:
- **Vercel**:
  - Cài đặt [Vercel CLI](https://vercel.com/docs/cli).
  - Chạy lệnh `vercel` và làm theo hướng dẫn.
- **Netlify**:
  - Cài đặt [Netlify CLI](https://docs.netlify.com/cli/get-started/).
  - Chạy lệnh `netlify deploy` và làm theo hướng dẫn.
- **GitHub Pages**:
  - Cài đặt gói `gh-pages`:
    ```bash
    npm install gh-pages --save-dev
    ```
  - Thêm các script sau vào `package.json`:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
  - Chạy lệnh:
    ```bash
    npm run deploy
    ```

---

### Ghi chú

- API của Lorem Picsum không cung cấp tiêu đề và mô tả cho ảnh, vì vậy các giá trị này được sử dụng dưới dạng placeholder.
- Đảm bảo phải cài đặt Node.js và npm trước khi bắt đầu.