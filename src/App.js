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
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// localStorage 키 정의
const TODOS_STORAGE_KEY = 'todos';

function App() {
  // todos 상태 초기화 - 이제 단순 배열 형태로 관리
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      // 저장된 데이터가 있으면 파싱, 없으면 빈 배열 반환
      const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
      // 기존 객체 형태의 데이터를 배열로 변환
      if (parsedTodos && !Array.isArray(parsedTodos)) {
        return [];
      }
      return parsedTodos;
    } catch (error) {
      console.error('초기 데이터 로드 실패:', error);
      return [];
    }
  });

  // todos 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('localStorage 저장 실패:', error);
    }
  }, [todos]);

  // props로 전달할 콜백 함수들을 useCallback으로 메모이제이션
  const handleUpdate = (id, data) => {
    setTodos(prevTodos => {
      const todoIndex = prevTodos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        alert("해당 할 일을 찾을 수 없습니다.");
        return prevTodos;
      }
      const newTodos = [...prevTodos];
      newTodos[todoIndex] = { ...newTodos[todoIndex], ...data };
      return newTodos;
    });
  };

  const handleDelete = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleAdd = (data) => {
    if (!data || !data.text.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    setTodos(prevTodos => [...prevTodos, { ...data, id: Date.now() }]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Tasks</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList 
        items={todos}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        listTitle="오늘의 할 일"
        emptyMessage="새로운 할 일을 추가해보세요!"
      />
    </div>
  );
}

export default App;
