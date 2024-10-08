import React, { useState, useEffect, useRef } from 'react';
import { FaFacebook, FaPhone, FaTelegram, FaEllipsisV } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Project Manager',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688155258i/182088430.jpg',
    facebook: 'https://facebook.com/alice',
    phone: '+123456789',
    telegram: 'https://telegram.me/alice'
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Lead Developer',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688155258i/182088430.jpg',
    facebook: 'https://facebook.com/bob',
    phone: '+987654321',
    telegram: 'https://telegram.me/bob'
  },
  {
    id: 3,
    name: 'Charlie Davis',
    role: 'UI/UX Designer',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688155258i/182088430.jpg',
    facebook: 'https://facebook.com/charlie',
    phone: '+123459876',
    telegram: 'https://telegram.me/charlie'
  },
  {
    id: 4,
    name: 'Dana Lee',
    role: 'QA Engineer',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688155258i/182088430.jpg',
    facebook: 'https://facebook.com/dana',
    phone: '+987654123',
    telegram: 'https://telegram.me/dana'
  },
  {
    id: 5,
    name: 'Evan Wright',
    role: 'Backend Developer',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688155258i/182088430.jpg',
    facebook: 'https://facebook.com/evan',
    phone: '+564738291',
    telegram: 'https://telegram.me/evan'
  },
  {
    id: 6,
    name: 'Fiona Clark',
    role: 'Frontend Developer',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688155258i/182088430.jpg',
    facebook: 'https://facebook.com/fiona',
    phone: '+918273645',
    telegram: 'https://telegram.me/fiona'
  }
];

const cardContainerStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '250px',
  position: 'relative',
  backgroundColor: '#fff',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  position: 'relative',
};

const imageStyle = {
  borderRadius: '50%',
  width: '150px',
  height: '150px',
  marginBottom: '15px',
};

const popupStyle = {
  position: 'absolute',
  top: '45%', // Closer to the image
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(5, 5, 5, 0.9)',
  padding: '40px',  // Much bigger padding for a larger pop-up
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  color: '#fff',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',  // Increased margin for larger icons and text
  fontSize: '20px', // Increase the font size
};

const iconTextStyle = {
  marginLeft: '15px',
  color: '#fff',
};

const threeDotsStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [pendingClose, setPendingClose] = useState(false); // New state to manage pending close
  const popUpRef = useRef();

  const handleTogglePopup = (index) => {
    if (pendingClose) {
      setPendingClose(false); // Reset pending close if toggling
      return;
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setActiveIndex(null);
      setPendingClose(true); // Set pending close state
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', padding: '140px' }} className="bg-teal-100">
      {teamMembers.map((member, index) => (
        <div key={member.id} style={cardContainerStyle}>
          <div style={cardStyle}>
            <img src={member.image} alt={member.name} style={imageStyle} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <FaEllipsisV
              style={threeDotsStyle}
              onClick={() => handleTogglePopup(index)}
            />
          </div>
          {activeIndex === index && (
            <div style={popupStyle} ref={popUpRef}>
              <div style={iconStyle}>
                <FaFacebook color="#3b5998" />
                <a href={member.facebook} target="_blank" rel="noopener noreferrer" style={iconTextStyle}>Facebook</a>
              </div>
              <div style={iconStyle}>
                <FaPhone color="#25d366" />
                <span style={iconTextStyle}>{member.phone}</span>
              </div>
              <div style={iconStyle}>
                <FaTelegram color="#0088cc" />
                <a href={member.telegram} target="_blank" rel="noopener noreferrer" style={iconTextStyle}>Telegram</a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
