
export default function History() {
  return (
    <div>
      {/* 상단 검색 정보 및 버튼 박스 */}
      <div>
        <div>
          <h1>&apos;문서명&apos;에 대한 이력결과</h1>
        </div>
        <div>
          <button>수정</button>
          <button>비교</button>
        </div>
      </div>
      {/* 이력 결과 */}
      <div>
        {/* 헤더 */}
        <div>
          <div></div>
          <div>버전</div>
          <div>수정일시</div>
          <div>닉네임</div>
          <div>작업내용</div>
        </div>
        <div>
          <div>
            <input type="radio" name="prev" />
            <input type="radio" name="next" />
          </div>
          <div>1</div>
          <div>2026-01-26(수정일시)</div>
          <div>사용자닉네임</div>
          <div>수정(작업내용)</div>
        </div>
      </div>
    </div>
  );
}
