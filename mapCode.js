import axios from "axios";
import { } from './token';

const list = [
    {
        "date": "2024-04-24T18:18:38",
        "title": "Xe nâng cũ | Xe nâng đã qua sử dụng có tốt không? Mua xe nâng cũ giá cực tốt, chất lượng cao",
        "slug": "xe-nang-cu-da-qua-su-dung-co-tot-khong",
        "fieldPost": {
            "description": "Nếu bạn đang tìm mua xe nâng, việc cân nhắc bán xe nâng đã qua sử dụng có thể là một bước đi thông minh không chỉ giúp bạn tiết kiệm tiền mà còn mang lại nhiều lợi ích phù hợp với nhu cầu kinh doanh của bạn.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Xe-nang-cu-da-su-dung-co-tot-khong.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Xe-nang-cu-da-su-dung-co-tot-khong.jpg"
            }
        }
    },
    {
        "date": "2024-04-19T18:03:05",
        "title": "6 chú ý và hướng dẫn an toàn khi vận hành xe nâng trong môi trường kho lạnh ",
        "slug": "an-toan-xe-nang-trong-moi-truong-kho-lanh",
        "fieldPost": {
            "description": "Kho lạnh và đông lạnh là môi trường khá khắc nghiệt đối với con người khi vận hành, nhưng máy móc cũng cảm nhận được cái lạnh. Xe nâng nói riêng thường đắt hơn và kém hiệu quả hơn khi chạy trong kho lạnh so với kho xung quanh. Việc vận hành an toàn xe nâng trong môi trường kho lạnh cũng có nhiều thách thức riêng và những cân nhắc để đảm bảo an toàn trong điều kiện khắt khe.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Huong-dan-van-hanh-an-toan-xe-nang-trong-moi-truong-kho-lanh.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Huong-dan-van-hanh-an-toan-xe-nang-trong-moi-truong-kho-lanh.jpg"
            }
        }
    },
    {
        "date": "2024-04-17T13:40:12",
        "title": "Lựa chọn giải pháp thuê hay mua xe nâng? Xe nâng giá tốt, tiết kiệm chi phí cho doanh nghiệp",
        "slug": "thue-hay-mua-xe-nang-xe-nang-gia-tot",
        "fieldPost": {
            "description": "Việc lựa chọn mua hay thuê xe nâng phụ thuộc vào nhiều yếu tố, bao gồm nhu cầu sử dụng, tình hình tài chính của doanh nghiệp, và chi phí liên quan đến việc mua và sử dụng xe nâng. Bài viết này cung cấp một số phân tích để giúp bạn đưa ra quyết định phù hợp.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thue-va-mua-xe-nang-uy-tin.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thue-va-mua-xe-nang-uy-tin.jpg"
            }
        }
    },
    {
        "date": "2024-04-13T15:05:51",
        "title": "Đèn chiếu điểm 20W (Blue Spotlight) và đèn chiếu vạch 30W (Red Zone Warning Light) cho xe nâng",
        "slug": "den-chieu-diem-va-den-chieu-vach-xe-nang",
        "fieldPost": {
            "description": "Đèn chiếu điểm xe nâng Led xanh, còn được gọi là đèn Blue Spot Light, là thiết bị an toàn quan trọng dành cho xe nâng hàng, giúp đảm bảo an toàn cho người vận hành, hàng hóa và môi trường xung quanh.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Den-chieu-diem-va-den-chieu-vach-xe-nang.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Den-chieu-diem-va-den-chieu-vach-xe-nang.jpg"
            }
        }
    },
    {
        "date": "2024-04-13T11:59:40",
        "title": "10 Phụ tùng xe nâng, Option nâng cao giúp cải thiện an toàn nơi làm việc",
        "slug": "10-phu-tung-xe-nang-option-nang-cao",
        "fieldPost": {
            "description": "Bảo trì xe nâng thường xuyên và thay thế các phụ tùng xe nâng chính hãng có thể cải thiện sự an toàn trong không gian làm việc hoặc nhà kho. Điều quan trọng không kém là người lái xe nâng an toàn, với sự đào tạo phù hợp, khả năng phán đoán tỉnh táo và thực hành công việc theo lẽ thường, một người điều khiển xe nâng có trình độ tốt sẽ giúp mọi người sống sót và không bị thương.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thiet-bi-an-toan-nang-cao.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thiet-bi-an-toan-nang-cao.jpg"
            }
        }
    },
    {
        "date": "2024-04-12T15:52:36",
        "title": "6 thiết bị an toàn nhất định phải có trên xe nâng của bạn",
        "slug": "6-thiet-bi-an-toan-phai-co-tren-xe-nang",
        "fieldPost": {
            "description": "Xe nâng là một phần cơ bản của bất kỳ hoạt động xử lý vật liệu nào. Nhưng giống như bất kỳ máy móc hạng nặng nào, chúng cũng có thể gây ra những mối nguy hiểm về an toàn tại nơi làm việc. Đó là lý do tại sao một số tính năng an toàn, thiết bị an toàn của xe nâng là tiêu chuẩn trên tất cả các xe nâng. Đảm bảo người vận hành của bạn biết cách sử dụng từng thiết bị một cách chính xác để ngăn ngừa tai nạn, thương tích và tử vong tại cơ sở của bạn.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thiet-bi-an-toan-xe-nang-phai-co.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thiet-bi-an-toan-xe-nang-phai-co.jpg"
            }
        }
    },
    {
        "date": "2024-04-12T14:35:34",
        "title": "5 thiết bị bảo hộ người vận hành xe nâng nhất định phải có: Giải thích chi tiết và lưu ý quan trọng",
        "slug": "5-thiet-bi-bao-ho-nguoi-van-hanh-xe-nang",
        "fieldPost": {
            "description": "An toàn là yếu tố hàng đầu khi vận hành xe nâng, do đó, việc trang bị đầy đủ thiết bị bảo hộ cho người lái xe là vô cùng quan trọng. Bài viết này sẽ cung cấp thông tin chi tiết về các thiết bị bảo hộ bắt buộc mà người vận hành xe nâng phải có, đồng thời đưa ra những lưu ý quan trọng để đảm bảo hiệu quả an toàn tối ưu.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thiet-bi-bao-ho-cho-nguoi-van-hanh-xe-nang.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Thiet-bi-bao-ho-cho-nguoi-van-hanh-xe-nang.jpg"
            }
        }
    },
    {
        "date": "2024-04-12T11:01:09",
        "title": "Một số quy tắc an toàn khi lái xe nâng điện và xe nâng dầu bạn cần biết",
        "slug": "quy-tac-an-toan-khi-lai-xe-nang-dien",
        "fieldPost": {
            "description": "Để đảm bảo an toàn khi lái xe nâng điện, xe nâng dầu hay các thiết bị nâng hạ khác, bài viết này, chúng tôi sẽ cung cấp cho bạn đọc và người điều khiển xe nâng các kiến thức và thông tin hữu ích.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Quy-tac-an-toan-lai-xe-nang-dien.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Quy-tac-an-toan-lai-xe-nang-dien.jpg"
            }
        }
    },
    {
        "date": "2024-04-10T17:17:45",
        "title": "Nguyên nhân phổ biến gây ra tai nạn xe nâng ở nơi làm việc",
        "slug": "nguyen-nhan-pho-bien-gay-tai-nan-xe-nang",
        "fieldPost": {
            "description": "Hằng năm, có rất nhiều vụ tai nạn xe nâng được thống kê, với tỉ lệ tử vong và thiệt hại khá lớn về người và của. Do vậy, phải thường xuyên đào tạo, giáo dục về các trường hợp tai nạn và biện pháp nâng cao an toàn trong quá trình vận hành xe nâng trong nhà xưởng. ",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Nguyen-nhan-tai-nan-xe-nang.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Nguyen-nhan-tai-nan-xe-nang.jpg"
            }
        }
    },
    {
        "date": "2024-04-03T14:57:26",
        "title": "Phân biệt xe nâng tay cao và xe nâng tay thấp | Ứng dụng của chúng trong các ngành công nghiệp",
        "slug": "xe-nang-tay-cao-va-xe-nang-tay-thap",
        "fieldPost": {
            "description": "Xe nâng tay thấp và xe nâng tay cao là dòng được ứng dụng nhiều trong các kho bãi, nhà máy, trung tâm phân phối. Cả hai loại xe nâng đều đóng vai trò quan trọng trong việc nâng cao năng suất, giảm thiểu hư hại hàng hóa, đảm bảo an toàn trong nhà máy.",
            "heroImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Xe-nang-tay-thap-Xe-nang-tay-cao.jpg"
            },
            "thumbImage": {
                "sourceUrl": "https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Xe-nang-tay-thap-Xe-nang-tay-cao.jpg"
            }
        }
    }
];






const listPost = list.map((item, index) => ({
    "data": {
        "content": "<p>Khi nói đến việc nâng cao hiệu quả và năng suất hoạt động kinh doanh của bạn, thiết bị phù hợp có thể tạo ra sự khác biệt. Xe nâng cũ là công cụ không thể thiếu trong các ngành công nghiệp khác nhau, cho phép xử lý vật liệu và thực hiện các nhiệm vụ hậu cần một cách liền mạch.</p><p>Nếu bạn đang tìm mua xe nâng, việc cân nhắc bán xe nâng đã qua sử dụng có thể là một bước đi thông minh không chỉ giúp bạn tiết kiệm tiền mà còn mang lại nhiều lợi ích phù hợp với nhu cầu kinh doanh của bạn.</p><p>Khi bạn chọn một chiếc xe nâng đã qua sử dụng từ dịch vụ cung cấp giải pháp xe nâng hàng Nhất Lộ Phát 168, bạn sẽ được hưởng lợi từ kinh nghiệm chuyên môn trong ngành và sự cống hiến xuất sắc của chúng tôi.</p><p>Đội ngũ giàu kinh nghiệm của chúng tôi lựa chọn cẩn thận từng thiết bị để bán lại, xem xét các yếu tố như lịch sử hoạt động, hồ sơ bảo trì và tình trạng tổng thể. Việc đánh giá tỉ mỉ này đảm bảo rằng chỉ những xe nâng chất lượng cao nhất mới được đưa vào kho của chúng tôi.</p><p>Trong bài viết này, chúng ta sẽ khám phá những lý do hàng đầu tại sao việc chọn xe nâng đã qua sử dụng có thể là giải pháp hoàn hảo cho doanh nghiệp của bạn.</p><p>10 Lợi ích thực sự khi chọn xe nâng đã qua sử dụng<br>1. Tiết kiệm chi phí<br>Có lẽ lợi thế rõ ràng nhất của việc mua xe nâng đã qua sử dụng là tiết kiệm chi phí đáng kể. Nếu bạn mua một chiếc xe nâng mới có thể có mức giá đắt đỏ, nó sẽ là áp lực lớn lên ngân sách của các doanh nghiệp, đặc biệt là các doanh nghiệp vừa và nhỏ. Ngược lại, xe nâng đã qua sử dụng cung cấp một giải pháp thay thế hợp lý hơn mà không làm mất đi chức năng.</p><p>Lợi thế chi phí ban đầu này giúp giải phóng vốn để có thể chuyển hướng sang các nhu cầu kinh doanh quan trọng khác, chẳng hạn như mở rộng lực lượng lao động, đầu tư vào nỗ lực tiếp thị hoặc hiện đại hóa các thiết bị khác. Xe nâng mới, giống như bất kỳ máy móc nào khác, bị giảm giá trị nhanh chóng trong vài năm đầu tiên sở hữu. Sự khấu hao này có thể có tác động đáng kể đến tình hình tài chính của doanh nghiệp.</p><p>Bằng cách chọn xe nâng đã qua sử dụng, phần lớn khấu hao ban đầu đã xảy ra, điều đó có nghĩa là khoản đầu tư của bạn ít có khả năng mất giá trị nhanh chóng như mua mới. Điều này giảm thiểu tác động tài chính tiềm ẩn mà khấu hao có thể gây ra và giúp duy trì giá trị của tài sản theo thời gian.</p><p>Giá thành của xe nâng cũ thường chỉ bằng 50-70% so với xe mới, giúp bạn tiết kiệm được một khoản chi phí đáng kể. Nếu doanh nghiệp đầu tư xe nâng lớn, mà khả năng chi trả thấp, năng lực tài chính có hạn thì việc sử dụng xe nâng cũ là một giải pháp an toàn và bớt các gánh nặng tài chính.<br>&nbsp;</p><figure class=\"image\"><img style=\"aspect-ratio:1024/576;\" src=\"http://localhost:1337/uploads/Xe_nang_trong_kho_lanh_1_1024x576_6db80153ba_76985116d6.jpg\" alt=\"Xe-nang-trong-kho-lanh-1-1024x576.jpg\" width=\"1024\" height=\"576\"></figure><p>&nbsp;</p>",
        "title": item.title,
        "slug": item.slug + `${index}`,
        "description": item.fieldPost.description,
        "summary": "<p>10 Lợi ích thực sự khi chọn xe nâng đã qua sử dụng<br>1. Tiết kiệm chi phí<br>2. Có sẵn ngay lập tức<br>3. Lựa chọn đa dạng<br>4. Chất lượng đảm bảo<br>5. Lợi tức đầu tư (ROI) nhanh hơn<br>6. Đàm phán dễ dàng hơn<br>7. Khả năng thích ứng và linh hoạt<br>8. Cơ hội đánh giá thiết bị<br>9. Ít giấy tờ và tài liệu hơn<br>10. Dễ dàng sửa chữa<br>Một số lưu ý khi mua xe nâng cũ</p>",
        "locale": "vi",
        "publicDate": item.date.split('T')[0]
    }
}))
// console.log(listPost);

listPost.forEach(item => {
    axios.post('http://localhost:1337/api/posts', item, {
        headers: {
            Authorization: `Bearer ${token.TokenLocal}`
        }
    }).then(res => console.log("sucess:=====", res.data))
    .catch(err => console.error("error:=====", err));
})