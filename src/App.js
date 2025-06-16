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

// 1. [초기 설정 및 임포트]
// 1-1. React와 필요한 훅을 임포트합니다.
import React, { useState, useEffect } from 'react';
// 1-2. CSS 모듈을 임포트하여 스타일을 적용합니다.
import styles from './App.module.css';
// 1-3. 하위 컴포넌트들을 임포트합니다.
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// 2. [상수 정의]
// 2-1. localStorage에서 사용할 키를 상수로 정의하여 일관성을 유지합니다.
const TODOS_STORAGE_KEY = 'todos';

// 3. [App 컴포넌트 정의]
function App() {
  // 4. [상태 관리]
  // 4-1. todos 상태를 useState 훅으로 초기화합니다.
  // 초기값은 콜백 함수를 통해 localStorage에서 가져옵니다.
  const [todos, setTodos] = useState(() => {
    try {
      // 4-2. localStorage에서 저장된 데이터를 가져옵니다.
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      // 4-3. 저장된 데이터가 있으면 JSON으로 파싱하고, 없으면 빈 배열을 사용합니다.
      const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
      // 4-4. 데이터가 배열 형태가 아니면 빈 배열로 초기화합니다.
      if (parsedTodos && !Array.isArray(parsedTodos)) {
        return [];
      }
      // 4-5. 정상적인 데이터면 그대로 반환합니다.
      return parsedTodos;
    } catch (error) {
      // 4-6. 오류 발생 시 콘솔에 오류를 출력하고 빈 배열을 반환합니다.
      console.error('초기 데이터 로드 실패:', error);
      return [];
    }
  });

  // 5. [데이터 자동 저장]
  // 5-1. useEffect 훅을 사용하여 todos 상태가 변경될 때마다 localStorage에 저장합니다.
  useEffect(() => {
    try {
      // 5-2. todos 배열을 JSON 문자열로 변환하여 저장합니다.
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      // 5-3. 저장 실패 시 오류를 콘솔에 출력합니다.
      console.error('localStorage 저장 실패:', error);
    }
  }, [todos]); // todos가 변경될 때만 실행

  // 6. [이벤트 핸들러 함수들]
  // 6-1. 할 일 수정 함수
  const handleUpdate = (id, data) => {
    setTodos(prevTodos => {
      // 6-1-1. 수정할 할 일의 인덱스를 찾습니다.
      const todoIndex = prevTodos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        // 6-1-2. 해당 id의 할 일이 없으면 오류 메시지를 표시합니다.
        alert("해당 할 일을 찾을 수 없습니다.");
        return prevTodos;
      }
      // 6-1-3. 불변성을 지키며 할 일을 수정합니다.
      const newTodos = [...prevTodos];
      newTodos[todoIndex] = { ...newTodos[todoIndex], ...data };
      return newTodos;
    });
  };

  // 6-2. 할 일 삭제 함수
  const handleDelete = (id) => {
    // 6-2-1. filter를 사용하여 해당 id의 할 일을 제외한 새 배열을 만듭니다.
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // 6-3. 새로운 할 일 추가 함수
  const handleAdd = (data) => {
    // 6-3-1. 입력값 검증
    if (!data || !data.text.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    // 6-3-2. 새로운 할 일을 배열에 추가합니다.
    setTodos(prevTodos => [...prevTodos, { ...data, id: Date.now() }]);
  };

  // 7. [컴포넌트 렌더링]
  return (
    // 7-1. 최상위 컨테이너
    <div className={styles.container}>
      {/* 7-2. 앱 제목 */}
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
