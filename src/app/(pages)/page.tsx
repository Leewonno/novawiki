export default function Home() {

  return (
    <div>
      <div>배너</div>
      <div>
        {/* 오늘의 인기 문서 */}
        <div>
          <h2>오늘의 인기 문서</h2>
          <div>
            <div>
              <h3>문서명</h3>
              <div>문서 내용 미리보기</div>
              <div>
                <span>최종수정자</span><span>2 시간전</span>
              </div>
            </div>
          </div>
        </div>
        {/* 최근 수정 문서 */}
        <div>
          <h2>최근 수정 문서</h2>
          <div>
            <ol>
              <li>아이폰</li>
              <li>챔스</li>
              <li>토트넘</li>
              <li>라이프치히</li>
              <li>가나다</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
