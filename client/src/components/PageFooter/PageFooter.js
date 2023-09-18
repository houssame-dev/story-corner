import React, { useEffect } from 'react'
import "./styles.css"
import { Space, Layout } from 'antd';
import {
    CopyrightOutlined,
    GlobalOutlined,
    TwitterOutlined,
    AntDesignOutlined,
    LinkedinFilled,
    GithubFilled,
    SmileTwoTone
} from '@ant-design/icons';
import aos from 'aos';
import 'aos/dist/aos.css';

const { Footer } = Layout;


function PageFooter() {
    useEffect(() => {
        aos.init();
    }, []);
    return (
        <Footer data-aos="zoom-in-up" id="footer"><CopyrightOutlined /> 2023 Story Corner. All Rights Reserved. <br /><br />
            Created by HOUSSAME ERRJEM. <br /><br />
            This website <GlobalOutlined /> is a MERN stack application. <br /><br />
            <br /><br />
            <a href="https://ant.design/" target="_blank" rel="noopener noreferrer"><AntDesignOutlined /> Ant Design </a> : Help designers/developers building beautiful products more flexible and working with happiness <SmileTwoTone /> !
            <br /><br /><br /><br />
            Follow me :
            <br /><br />
            <Space>            
                <a href="https://twitter.com/errjem2" target="_blank" rel="noopener noreferrer"><<TwitterOutlined /> style={{ fontSize: '30px', color: "white" }} /></a>
                <a href="https://www.linkedin.com/in/errjem/" target="_blank" rel="noopener noreferrer"><LinkedinFilled style={{ fontSize: '30px', color: "white" }} /></a>
                <a href="https://github.com/Errjem" target="_blank" rel="noopener noreferrer"><GithubFilled style={{ fontSize: '30px', color: "white" }} /></a>
            </Space>
        </Footer>
    )
}

export default PageFooter
