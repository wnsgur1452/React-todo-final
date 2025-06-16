/**
 * [컴포넌트 구조 및 데이터 흐름도]
 * 
 * App (최상위 컴포넌트)
 * ├─── LocalStorage
 * │    ├─── 저장: todos 상태가 변경될 때마다 자동 저장
 * │    └─── 로드: 컴포넌트 마운트 시 초기 데이터 로드
 * │
 * ├─── State: todos 배열
 * │    └─── { id: number, text: string, completed: boolean }
 * │
 * ├─── TodoForm (입력 컴포넌트)
 * │    └─── Props: { onAdd } ─────────────┐
 * │                                       │
 * │                                       ▼
 * │                                    addTodo() 함수 실행
 * │                                       │
 * │                                       ▼
 * │                                  todos 상태 업데이트
 * │                                       │
 * │                                       ▼
 * │                              localStorage에 자동 저장
 * │
 * └─── TodoList (목록 컴포넌트)
 *      ├─── Props: { items, onUpdate, onDelete }
 *      │
 *      └─── TodoItem (개별 항목 컴포넌트)
 *           └─── Props: { item, onUpdate, onDelete }
 */

// 1. 필요한 리액트 기능들을 임포트합니다.
import React, { useState, useEffect } from 'react';  // useState: 상태 관리, useEffect: 부수 효과 처리
import styles from './App.module.css';              // CSS 모듈 스타일
import TodoList from './components/TodoList';        // 할 일 목록 컴포넌트
import TodoForm from './components/TodoForm';        // 할 일 입력 컴포넌트

// 2. localStorage에서 사용할 키 이름을 상수로 정의
const TODOS_STORAGE_KEY = 'todos';

function App() {
  // 1단계: localStorage에서 초기 데이터 로드
  const [todos, setTodos] = useState(() => {
    try {
      // localStorage에서 데이터 읽기 시도
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      console.log('초기 데이터 로드:', savedTodos); // 디버깅 로그
      
      // 데이터가 있으면 파싱하여 반환, 없으면 빈 배열 반환
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('초기 데이터 로드 실패:', error);
      return [];
    }
  });

  // 2단계: todos 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      console.log('localStorage 저장 시도:', todos); // 디버깅 로그
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
      console.log('localStorage 저장 완료'); // 디버깅 로그
    } catch (error) {
      console.error('localStorage 저장 실패:', error);
    }
  }, [todos]); // todos가 변경될 때만 실행

  // 3단계: 할 일 추가 함수
  function addTodo(data) {
    if (!data || !data.text.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    
    // 이전 상태를 기반으로 새로운 상태를 설정 (함수형 업데이트)
    setTodos(prevTodos => {
      console.log('할 일 추가:', data); // 디버깅 로그
      return [...prevTodos, data];
    });
  }

  // 4단계: 할 일 수정 함수
  function updateTodo(id, data) {
    setTodos(prevTodos => {
      const todoIndex = prevTodos.findIndex(todo => todo.id === id);
      
      if (todoIndex === -1) {
        alert("해당 할 일을 찾을 수 없습니다.");
        return prevTodos;
      }

      const updatedTodos = [...prevTodos];
      updatedTodos[todoIndex] = { ...updatedTodos[todoIndex], ...data };
      
      console.log('할 일 수정:', updatedTodos); // 디버깅 로그
      return updatedTodos;
    });
  }

  // 5단계: 할 일 삭제 함수
  function deleteTodo(id) {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);
      console.log('할 일 삭제 후:', updatedTodos); // 디버깅 로그
      return updatedTodos;
    });
  }

  // 9. UI 렌더링
  return (
    // 9-1. 전체 앱을 감싸는 컨테이너
    <div className={styles.container}>
      {/* 9-2. 앱 제목 */}
      <h1 className={styles.title}>My Tasks</h1>

      {/* 9-3. 할 일 입력 폼 */}
      <TodoForm onAdd={addTodo} />

      {/* 9-4. 할 일 목록 */}
      <TodoList 
        items={todos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

// 10. App 컴포넌트 내보내기
export default App;
