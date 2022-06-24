import Template from "../components/template";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getRoomIdAxios, ChatListAxios } from "../modules/chatInfo";
import { checkUserValidation } from "../modules/user";

function ChatList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.userInfo.userEmail);

  const chatlist = useSelector((state) => state.chatInfo.list);
  const roomId = useSelector((state) => state.chatInfo);
  const isLogin = useSelector((state) => state.user.userInfo.is_login);

  React.useEffect(() => {
    if (isLogin === null) {
      dispatch(checkUserValidation());
      return;
    }
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  React.useEffect(() => {
    dispatch(ChatListAxios(id));
  }, [isLogin]);

  const gotoChatroom = async (other) => {
    await dispatch(getRoomIdAxios(id, other)).then((res) => {
      navigate(`/room/${res}`);
    });
  };

  return (
    <Template>
      <ChatHeader>
        <Title>채팅목록</Title>
        <HeaderLine />
      </ChatHeader>
      <ListArea>
        {chatlist.map((v, i) => {
          return (
            <div key={"chatlist" + i}>
              <ProfileCover
                onClick={() => {
                  gotoChatroom(v.userEmail);
                }}
              >
                <ProfileImg src={"http://15.165.160.107/" + v.imageUrl} />
                <NameCover>
                  <Name>{v.userName}</Name>
                </NameCover>
              </ProfileCover>
              {chatlist.length - 1 === i ? null : <ProfileLine />}
            </div>
          );
        })}
      </ListArea>
    </Template>
  );
}

const ChatHeader = styled.section`
  width: 100%;
  height: 30px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: large;
  margin-left: 20px;
`;

const HeaderLine = styled.hr`
  background-color: deepskyblue;
  width: calc(100% - 20px);
`;

const ListArea = styled.section`
  width: 100%;
  height: calc(100vh - 180px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 10px;
`;

const ProfileCover = styled.div`
  margin: 20px 0px 0px 30px;
  width: calc(100% - 60px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
`;

const NameCover = styled.div`
  margin-left: 20px;
`;

const Name = styled.p`
  font-size: 20px;
`;

const ProfileLine = styled.hr`
  background-color: #ddd;
  width: calc(100% - 30px);
`;

export default ChatList;
