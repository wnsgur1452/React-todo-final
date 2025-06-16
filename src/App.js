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

// 3. App 컴포넌트 정의
function App() {
  // 4. localStorage를 사용한 상태 초기화
  // useState의 초기값으로 콜백 함수를 사용하여 첫 렌더링 시에만 실행되도록 최적화
  const [todos, setTodos] = useState(() => {
    try {
      // 4-1. localStorage에서 저장된 데이터 읽기
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      // 4-2. 저장된 데이터가 있으면 JSON 파싱하여 반환, 없으면 빈 배열 반환
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      // 4-3. 에러 발생 시 (JSON 파싱 실패 등) 빈 배열 반환
      console.error('할 일 목록을 불러오는데 실패했습니다:', error);
      return [];
    }
  });

  // 5. todos 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      // 5-1. todos 배열을 JSON 문자열로 변환하여 저장
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      // 5-2. 저장 실패 시 에러 로깅
      console.error('할 일 목록을 저장하는데 실패했습니다:', error);
    }
  }, [todos]); // todos가 변경될 때만 실행

  // 6. 할 일 추가 함수
  function addTodo(data) {
    // 6-1. 입력값 유효성 검사
    if (!data || !data.text.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    
    // 6-2. 새로운 할 일을 배열에 추가
    setTodos([...todos, data]);
    // 6-3. useEffect가 자동으로 triggered되어 localStorage에 저장됨
  }

  // 7. 할 일 수정 함수
  function updateTodo(id, data) {
    // 7-1. 수정할 할 일의 인덱스 찾기
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    // 7-2. 할 일을 찾지 못한 경우 처리
    if (todoIndex === -1) {
      alert("해당 할 일을 찾을 수 없습니다.");
      return;
    }

    // 7-3. 기존 데이터를 유지하면서 새 데이터로 업데이트
    todos[todoIndex] = {...todos[todoIndex], ...data, id};

    // 7-4. 상태 업데이트 및 자동 저장
    setTodos([...todos]);
  }

  // 8. 할 일 삭제 함수
  function deleteTodo(id) {
    // 8-1. 삭제할 할 일의 인덱스 찾기
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    // 8-2. 할 일을 찾지 못한 경우 처리
    if (todoIndex === -1) {
      alert("해당 할 일을 찾을 수 없습니다.");
      return;
    }

    // 8-3. 해당 할 일을 제외한 새 배열 생성
    const updatedTodos = todos.filter((todo, index) => index !== todoIndex);

    // 8-4. 상태 업데이트 및 자동 저장
    setTodos(updatedTodos);
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
