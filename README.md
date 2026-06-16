# Andy RED Vol.2 단어 암기 카드

ESL Rainbows RED Vol.2 `quizData.json`을 기반으로 만든 단어 암기 전용 플래시카드 웹앱입니다.

## 기능

- Unit-Day 세트 선택 및 세트별 진행률 저장
- 1단계: 외우기 카드
- 2단계: 뜻 보고 영어단어 2지선다 고르기
- 3단계: 알파벳 카드 조립
- 다시 볼 카드 복습
- Web Speech API 기반 영어 발음 듣기
- 다크모드, 모바일 햄버거 메뉴
- 링크 복사, QR 코드, 카카오톡 공유 대체 안내

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## 배포

Vercel은 `vercel.json`의 `outputDirectory: dist` 설정을 사용합니다.

공유 URL은 빌드 시 `PUBLIC_URL` 환경변수가 있으면 우선 사용하고, 없으면 브라우저의 현재 주소를 사용합니다.
카카오톡 공유는 `KAKAO_JS_KEY` 환경변수가 없으면 링크 복사 안내로 대체됩니다.
