import type { Topic } from '@/features/topics/types/topic'
import type { Article } from '@/features/articles/types/article'
import type { User } from '@/api/users'
import type { Interaction } from '@/features/interactions/types/interaction'
import type { ConnectionSession } from '@/features/sessions/types/session'

/**
 * Mock Topics
 */
export const MOCK_TOPICS: Topic[] = [
  {
    id: '1',
    name: 'Classroom Management',
    nameJa: 'クラス管理',
    description: 'Techniques for managing classroom behavior and environment',
    color: '#3b82f6',
  },
  {
    id: '2',
    name: 'Student Communication',
    nameJa: '生徒とのコミュニケーション',
    description: 'Effective ways to communicate with students',
    color: '#10b981',
  },
  {
    id: '3',
    name: 'Lesson Planning',
    nameJa: '授業準備',
    description: 'Tips for planning and preparing lessons',
    color: '#f59e0b',
  },
  {
    id: '4',
    name: 'Problem Solving',
    nameJa: '問題解決',
    description: 'Handling difficult situations in the classroom',
    color: '#ef4444',
  },
  {
    id: '5',
    name: 'Teaching Methods',
    nameJa: '教授法',
    description: 'Various teaching methodologies and approaches',
    color: '#8b5cf6',
  },
  {
    id: '6',
    name: 'Teaching Materials',
    nameJa: '教材',
    description: 'Creating and using teaching materials effectively',
    color: '#ec4899',
  },
]

/**
 * Mock Users
 */
export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Tanaka Sensei',
    email: 'tanaka@example.com',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'user-2',
    name: 'Suzuki Sensei',
    email: 'suzuki@example.com',
    createdAt: new Date('2024-02-20').toISOString(),
  },
  {
    id: 'user-3',
    name: 'Yamada Sensei',
    email: 'yamada@example.com',
    createdAt: new Date('2024-03-10').toISOString(),
  },
]

/**
 * Mock Articles
 */
export const MOCK_ARTICLES: Article[] = [
  {
    id: 'article-1',
    title: '初回授業の簡単なアイスブレイカー',
    content:
      '「2つの真実と1つの嘘」というシンプルなゲームから始めましょう。生徒は自分について2つの真実と1つの嘘を書きます。他の生徒がどれが嘘かを当てます。5分で終わり、緊張をほぐし、名前を早く覚えるのに役立ちます。',
    summary: '初回授業を始めるための5分間の簡単なアイスブレイカーゲーム',
    topicId: '1',
    authorId: 'user-1',
    readTime: 1,
    createdAt: new Date('2024-12-01').toISOString(),
    updatedAt: new Date('2024-12-01').toISOString(),
  },
  {
    id: 'article-2',
    title: '問題行動を起こす生徒への対応',
    content:
      '生徒が授業を妨害したときは、「3-2-1」アプローチを使いましょう：3秒間のアイコンタクト、2歩近づく、1つの静かな言葉。この対立を避ける方法は、生徒を恥ずかしがらせることなく、行動を止めることがよくあります。',
    summary: '対立を避けながら問題行動に対処する優しい3-2-1メソッド',
    topicId: '1',
    authorId: 'user-2',
    readTime: 2,
    createdAt: new Date('2024-12-02').toISOString(),
    updatedAt: new Date('2024-12-02').toISOString(),
  },
  {
    id: 'article-3',
    title: '静かな生徒との信頼関係を築く',
    content:
      '机の上に小さなメモを置きましょう：「今日は素晴らしい仕事でした！」または「あなたの思慮深い答えに気づきました。」この個人的なアプローチは、他の人の前で彼らを困らせることなく、あなたが彼らを見ていることを示します。',
    summary: '内向的な生徒とつながるためのシンプルなメモ書きテクニック',
    topicId: '2',
    authorId: 'user-1',
    readTime: 1,
    createdAt: new Date('2024-12-03').toISOString(),
    updatedAt: new Date('2024-12-03').toISOString(),
  },
  {
    id: 'article-4',
    title: '5分間の授業ウォームアップ',
    content:
      '前回の授業からの簡単な復習問題で各授業を始めましょう。生徒が入ってくる時に黒板に書きます。最初の3つの正解には小さなシールをあげます。これにより、すぐに集中させ、前回の内容を復習できます。',
    summary: '最初から生徒を引き込むための簡単な復習問題ウォームアップ',
    topicId: '3',
    authorId: 'user-3',
    readTime: 2,
    createdAt: new Date('2024-12-04').toISOString(),
    updatedAt: new Date('2024-12-04').toISOString(),
  },
  {
    id: 'article-5',
    title: '生徒が理解できないとき',
    content:
      '同じ説明を繰り返す代わりに、「どの部分が混乱していますか？」と尋ねましょう。これにより、正確な問題を特定できます。その後、別の例や視覚的な補助を使います。多くの場合、問題はすべてではなく、1つの特定の概念です。',
    summary: '特定の混乱を特定して解決するための質問ベースのアプローチ',
    topicId: '4',
    authorId: 'user-2',
    readTime: 2,
    createdAt: new Date('2024-12-05').toISOString(),
    updatedAt: new Date('2024-12-05').toISOString(),
  },
  {
    id: 'article-6',
    title: '実物を使った授業',
    content:
      '授業に関連する日常的なアイテムを持参しましょう。色を教える？実際の果物を見せます。数字を教える？硬貨やボタンを使います。生徒は写真だけでなく、実際の物に触れて見ることができると、よりよく覚えます。',
    summary: 'より良い記憶定着のために写真の代わりに実物を使用する',
    topicId: '6',
    authorId: 'user-1',
    readTime: 1,
    createdAt: new Date('2024-12-06').toISOString(),
    updatedAt: new Date('2024-12-06').toISOString(),
  },
  {
    id: 'article-7',
    title: 'グループワークを簡単に',
    content:
      '役割を割り当てましょう：リーダー（グループをタスクに集中させる）、ライター（メモを取る）、プレゼンター（結果を共有する）、タイムキーパー（時計を見る）。この構造により、1人がすべての作業を行うことを防ぎ、全員を参加させます。',
    summary: '効果的なグループワークのための役割分担戦略',
    topicId: '5',
    authorId: 'user-3',
    readTime: 2,
    createdAt: new Date('2024-12-07').toISOString(),
    updatedAt: new Date('2024-12-07').toISOString(),
  },
  {
    id: 'article-8',
    title: '簡単なエグジットチケット方法',
    content:
      '付箋で授業を終えましょう。生徒は学んだこと1つと、まだ持っている質問1つを書きます。退出時に集めます。次の授業の前に確認して、共通の質問に対処し、何が定着したかを見ます。',
    summary: '理解を確認し、次の授業を計画するための付箋エグジットチケット',
    topicId: '3',
    authorId: 'user-2',
    readTime: 1,
    createdAt: new Date('2024-12-08').toISOString(),
    updatedAt: new Date('2024-12-08').toISOString(),
  },
]

/**
 * Mock Interactions
 */
export const MOCK_INTERACTIONS: Interaction[] = [
  {
    id: 'interaction-1',
    articleId: 'article-1',
    userId: 'user-2',
    type: 'useful',
    createdAt: new Date('2024-12-01T10:00:00').toISOString(),
  },
  {
    id: 'interaction-2',
    articleId: 'article-1',
    userId: 'user-3',
    type: 'useful',
    createdAt: new Date('2024-12-01T11:00:00').toISOString(),
  },
  {
    id: 'interaction-3',
    articleId: 'article-1',
    userId: 'user-1',
    type: 'comment',
    content: '昨日試してみましたが、完璧に機能しました！',
    createdAt: new Date('2024-12-01T12:00:00').toISOString(),
  },
  {
    id: 'interaction-4',
    articleId: 'article-2',
    userId: 'user-1',
    type: 'useful',
    createdAt: new Date('2024-12-02T09:00:00').toISOString(),
  },
  {
    id: 'interaction-5',
    articleId: 'article-2',
    userId: 'user-3',
    type: 'useful',
    createdAt: new Date('2024-12-02T10:00:00').toISOString(),
  },
  {
    id: 'interaction-6',
    articleId: 'article-2',
    userId: 'user-2',
    type: 'comment',
    content: 'この方法は声を上げるよりもずっと良いです。',
    createdAt: new Date('2024-12-02T11:00:00').toISOString(),
  },
  {
    id: 'interaction-7',
    articleId: 'article-3',
    userId: 'user-2',
    type: 'useful',
    createdAt: new Date('2024-12-03T14:00:00').toISOString(),
  },
  {
    id: 'interaction-8',
    articleId: 'article-4',
    userId: 'user-1',
    type: 'useful',
    createdAt: new Date('2024-12-04T08:00:00').toISOString(),
  },
  {
    id: 'interaction-9',
    articleId: 'article-4',
    userId: 'user-2',
    type: 'useful',
    createdAt: new Date('2024-12-04T09:00:00').toISOString(),
  },
  {
    id: 'interaction-10',
    articleId: 'article-4',
    userId: 'user-3',
    type: 'useful',
    createdAt: new Date('2024-12-04T10:00:00').toISOString(),
  },
]

/**
 * Mock Sessions (empty initially, will be created when articles reach threshold)
 */
export const MOCK_SESSIONS: ConnectionSession[] = []
