import React, { useState } from 'react';
import { loginUser, registerUser } from '../../entities/user/api/authService';
import { X, ArrowRight } from "lucide-react";
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(email, password);
      }
      onClose();
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
         setError("Неверный email или пароль.");
      } else if (err.code === "auth/email-already-in-use") {
         setError("Пользователь с таким email уже существует.");
      } else if (err.code === "auth/weak-password") {
         setError("Пароль должен содержать минимум 6 символов.");
      } else {
         setError(err.message);
      }
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-container" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 className="auth-modal-title">
          {isLogin ? 'С возвращением!' : 'Создать аккаунт'}
        </h2>
        <p className="auth-modal-subtitle">
          {isLogin ? 'Авторизуйтесь, чтобы продолжить покупки' : 'Присоединяйтесь к нам и наслаждайтесь шоппингом'}
        </p>

        {error && <div className="auth-modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-modal-form">
          <input 
            className="auth-modal-input" 
            type="email" 
            placeholder="Ваш Email" 
            value={email} 
            onChange={e => {setEmail(e.target.value); setError(null);}} 
            required 
          />
          <input 
            className="auth-modal-input" 
            type="password" 
            placeholder="Ваш пароль" 
            value={password} 
            onChange={e => {setPassword(e.target.value); setError(null);}} 
            required 
          />
          
          <button className="auth-modal-submit" type="submit">
            {isLogin ? 'Войти в аккаунт' : 'Зарегистрироваться'}
            <ArrowRight size={18} />
          </button>
        </form>

        <button className="auth-modal-toggle" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
          {isLogin ? (
            <>Нет аккаунта? <span>Создайте прямо сейчас</span></>
          ) : (
            <>Уже есть аккаунт? <span>Войти</span></>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;