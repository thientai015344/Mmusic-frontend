import React, { Component } from 'react';
import '../css/profilesinger.css';

class Profilesinger extends Component {
    render() {
        return (
            <>
            <div className="profile-background1">
                <div className="profile-all Wrap">
                    <div className="profile-content">
                        <h1 className="profile-Name"  >Hoàng Tôn</h1>
                        <p className="profile-story">
                             Hoàng Tôn sinh ra trong gia đình nghệ thuật, mẹ là giảng viên thanh nhạc còn bố là nhạc công guitar.
                            Năm 2013, anh tham gia The Voice, giành giải Á Quân và gây chú ý với giọng hát tốt cùng khả năng
                             tự sáng tác cả hai ca khúc biểu diễn trong chương trình là "Illusion" và "Dành Cho Em".
                            Sau cuộc thi, sự nghiệp ca sĩ của Hoàng Tôn gặp nhiều thuận lợi, anh có những bản hit được
                             yêu thích như "Em Không Quây Về" (2014), "Yêu Em Rất Nhiều" (2017) hay "Please" (2018)... 
                             Ngoài ca sĩ solo, anh cũng là hát chính của nhóm nhạc 4 người có tên FBBoiz.
                            Với vai trò ca sĩ, anh là tác giả của nhiều hit nổi tiếng như "Nỗi Nhớ Đầy Vơi"
                             của Noo Phước Thịnh và Hồ Ngọc Hà, "Em Không Cần" của Thủy Tiên, "Tìm" của Min...
                        </p>
                    </div>
                    <div className="profile-img">
                    <img src="./img/avata/hoangton.jpg" alt="" className="img-avata" />
                    </div>
                </div>

            </div>
            <div className="profile-background2">
                

            </div>

                
            </>
        );
    }
}

export default Profilesinger;