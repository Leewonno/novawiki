'use client'

import { createClient } from '@/shared/lIb/supabase/client';
import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: 'F-Wiki에 오신 것을 환영합니다',
    description: '누구나 참여할 수 있는 열린 백과사전',
    bgColor: 'bg-blue-600',
  },
  {
    id: 2,
    title: '새로운 문서를 작성해보세요',
    description: '지식을 공유하고 함께 성장하는 커뮤니티',
    bgColor: 'bg-purple-600',
  },
  {
    id: 3,
    title: '이번 주 인기 문서',
    description: '많은 사람들이 관심을 가진 주제를 확인하세요',
    bgColor: 'bg-green-600',
  },
];

const mockDocuments = [
  { id: 1, title: '프로그래밍', description: '컴퓨터 프로그래밍의 기초와 원리', updatedAt: '2026-01-27' },
  { id: 2, title: 'JavaScript', description: '웹 개발의 핵심 프로그래밍 언어', updatedAt: '2026-01-26' },
  { id: 3, title: 'React', description: '사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리', updatedAt: '2026-01-25' },
  { id: 4, title: 'Next.js', description: 'React 기반의 풀스택 웹 프레임워크', updatedAt: '2026-01-24' },
  { id: 5, title: 'TypeScript', description: '타입 안전성을 제공하는 JavaScript의 상위 집합', updatedAt: '2026-01-23' },
  { id: 6, title: 'Tailwind CSS', description: '유틸리티 우선 CSS 프레임워크', updatedAt: '2026-01-22' },
];

export default function Home() {

  useEffect(() => {
    const getData = async () => {
      const supabase = createClient()
      // 로그인 정보
      // const { data: { user } } = await supabase.auth.getUser();
      // 로그아웃
      // await supabase.auth.signOut()
      // 조회
      // const { data } = await supabase.from('document').select('*');
      // 생성
      await supabase.from('document').insert({
        title: 'hello',
        content: 'world'
      })
      // 수정
      await supabase.from('document')
        .update({ title: '수정됨' })
        .eq('id', 1)
      // 삭제
      // await supabase.from('document')
      //   .delete()
      //   .eq('id', 1)
    }
    getData()
  }, [])

  // return <div>{user ? user.email : '로그인 안됨'}</div>

  const [currentBanner, setCurrentBanner] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 슬라이드 배너 */}
      <section className="relative w-full h-64 md:h-80 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`flex-shrink-0 w-full h-full ${banner.bgColor} flex flex-col items-center justify-center text-white px-4`}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">
                {banner.title}
              </h2>
              <p className="text-base md:text-lg opacity-90 text-center">
                {banner.description}
              </p>
            </div>
          ))}
        </div>

        {/* 이전/다음 버튼 */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
          aria-label="이전 배너"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
          aria-label="다음 배너"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 인디케이터 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-3 h-3 cursor-pointer rounded-full transition-colors ${currentBanner === index ? 'bg-white' : 'bg-white/50'
                }`}
              aria-label={`배너 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </section>

      {/* 위키 문서 목록 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">최근 문서</h2>
          <a href="/search" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            전체보기 →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDocuments.map((doc) => (
            <article
              key={doc.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                {doc.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {doc.description}
              </p>
              <time className="text-xs text-gray-400">
                {doc.updatedAt}
              </time>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
