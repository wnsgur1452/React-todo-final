/**
 * [TodoList 컴포넌트]
 * 할 일 목록을 관리하고 표시하는 컴포넌트입니다.
 * 
 * 데이터 흐름:
 * 1. App → TodoList : items 배열, onUpdate/onDelete 함수 전달
 * 2. TodoList → TodoItem : 개별 item과 함수들을 props로 전달
 * 3. TodoItem에서 발생한 이벤트 → TodoList → App으로 전파
 */

// 1. [초기 설정]
// 1-1. 필요한 컴포넌트와 스타일을 임포트합니다.
import React from "react";
import TodoItem from "./TodoItem";  // 개별 할 일 항목 컴포넌트
import styles from './TodoList.module.css';

// 2. [컴포넌트 정의]
function TodoList(props) {
  // 2-1. props 안전성 처리
  // items가 배열이 아닌 경우를 대비해 기본값으로 빈 배열을 설정합니다.
  const todoItems = Array.isArray(props.items) ? props.items : [];

  // 3. [UI 렌더링]
  return (
    // 3-1. 전체 목록 컨테이너
    <div className={styles.todoList}>
      {/* 3-2. 목록 제목 */}
      <h2 className={styles.listTitle}>{props.listTitle || '할 일 목록'}</h2>
      
      {/* 3-3. 조건부 렌더링: 목록이 비어있는 경우와 아닌 경우 */}
      {todoItems.length === 0 ? (
        // 3-3-1. 빈 목록 메시지
        <p className={styles.emptyMessage}>
          {props.emptyMessage || '할 일이 없습니다.'}
        </p>
      ) : (
        // 3-3-2. 할 일 목록
        <ul className={styles.list}>
          {/* 3-4. 각 할 일 항목을 TodoItem 컴포넌트로 변환 */}
          {todoItems.map((item) => (
            // 3-4-1. 각 항목을 li로 감싸고 고유 key 지정
            <li key={item.id} className={styles.listItem}>
              {/* 3-4-2. TodoItem 컴포넌트에 필요한 props 전달 */}              <TodoItem 
                  item={item}
                  onUpdate={props.onUpdate}
                  onDelete={props.onDelete}
              />객체
                  onUpdate={props.onUpdate} // 수정 처리 함수
                  onDelete={props.onDelete} // 삭제 처리 함수
                  onUpdate={props.onUpdate}    // 수정 함수
                  onDelete={props.onDelete}    // 삭제 함수
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// 4. TodoList 컴포넌트를 내보냅니다.
export default TodoList;