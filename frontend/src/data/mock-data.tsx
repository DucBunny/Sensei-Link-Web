import type { Article, NotificationItem } from '@/types'

export const NOTIFICATIONS: Array<NotificationItem> = [
  {
    id: 1,
    type: 'session',
    title: 'リマインダー：交流会がまもなく始まります',
    message:
      'テーマ「授業中の私語への対処法」は今夜20:00開始です。質問の準備をお忘れなく！',
    time: '1時間前',
    read: false,
  },
  {
    id: 2,
    type: 'session',
    title: '登録完了',
    message:
      '「ポジティブな学級文化を作る」のディスカッションへの参加登録が完了しました。Google Meetのリンクをメールで送信しました。',
    time: '1日前',
    read: true,
  },
  {
    id: 3,
    type: 'system',
    title: '新しいコンテンツの更新',
    message:
      'Sensei Linkに「思春期の生徒心理」に関する新しい記事が5件追加されました。',
    time: '2日前',
    read: true,
  },
]

export const ARTICLES: Array<Article> = [
  {
    id: 1,
    title: '授業中の集中力を高める方法',
    category: '指導法',
    summary: 'たった30秒で生徒の注意を引きつける3つの小さなテクニック。',
    content: (
      <div className="space-y-4">
        <p>
          教師は静かにさせるために多くのエネルギーを使いがちです。代わりに、
          <strong>「静寂の合図（サイレント・シグナル）」</strong>
          というテクニックを試してみてください。
        </p>
        <p>
          生徒よりも大きな声を出すのではなく、声をささやき声に落とすか、完全に5秒間沈黙してみてください。音量の急激な変化は、生徒の脳の注意反射を刺激します。
        </p>
        <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm italic">
          「教師の沈黙は、時に千の注意喚起よりも重みがある。」
        </div>
      </div>
    ),
    readTime: '1分',
    interestedCount: 45,
    hasSession: false,
  },
  {
    id: 2,
    title: '授業中の私語への対処法',
    category: '学級経営',
    summary: '怒鳴ることなくクラスを落ち着かせるための3ステップ。',
    content: (
      <div className="space-y-4">
        <p>
          クラスが騒がしいとき、つい怒鳴りたくなりますが、以下の3ステップを試してください：
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>ステップ1 - 観察：</strong> 最も見えやすい場所で静止します。
          </li>
          <li>
            <strong>ステップ2 - 良いグループを褒める：</strong>{' '}
            「1班は準備が早くて素晴らしいですね」と伝えます。
          </li>
          <li>
            <strong>ステップ3 - 具体的な指示：</strong>{' '}
            「静かにしなさい」ではなく、「教科書の45ページを開いて黒板を見なさい」と言います。
          </li>
        </ul>
      </div>
    ),
    readTime: '2分',
    interestedCount: 128,
    hasSession: true,
    sessionTime: '1月10日 (土) 20:00',
  },
  {
    id: 3,
    title: '内向的な生徒とグループワーク',
    category: '生徒心理',
    summary: '集団活動の中で生徒が「埋もれて」しまわないようにするには？',
    content: (
      <div className="space-y-4">
        <p>
          内向的な生徒は深い考えを持っていますが、議論をためらうことがあります。解決策は：
        </p>
        <p>
          <strong>具体的な役割を与える：</strong>{' '}
          書記、タイムキーパー、観察者など。これにより、発言権を争うことなく参加するための明確な「任務」が得られます。
        </p>
      </div>
    ),
    readTime: '1.5分',
    interestedCount: 32,
    hasSession: false,
  },
  {
    id: 4,
    title: 'ポジティブな学級文化を作る',
    category: '学級経営',
    summary: '小さな習慣が大きな絆を生み出します。',
    content: (
      <div className="space-y-4">
        <p>
          教室の入り口で生徒一人一人の名前を呼んで挨拶することから一日を始めましょう。授業開始時の3秒間の個人的なつながりは、授業中の反抗的な態度を50％減らすことができます。
        </p>
      </div>
    ),
    readTime: '1分',
    interestedCount: 89,
    hasSession: true,
    sessionTime: '6月25日 (日) 19:30',
  },
  {
    id: 5,
    title: '授業準備へのAI活用',
    category: '教育ICT',
    summary: 'ChatGPTとCanvaの助けを借りて、教材作成時間を50％削減。',
    content: (
      <div className="space-y-4">
        <p>
          テクノロジーは教師に取って代わるものではありませんが、テクノロジーを使える教師はそうでない教師に取って代わるでしょう。まずはAIを使って授業案の構成を考えることから始めましょう。
        </p>
      </div>
    ),
    readTime: '3分',
    interestedCount: 210,
    hasSession: true,
    sessionTime: '6月30日 (金) 20:00',
  },
  {
    id: 6,
    title: '教師のためのポモドーロ・テクニック',
    category: '指導法',
    summary: '採点や事務作業の時間を効率的に管理する。',
    content: (
      <div className="space-y-4">
        <p>
          2時間続けて採点をしようとしないでください。25分の作業と5分の休憩に分割しましょう。集中力が長く続くことに気づくはずです。
        </p>
      </div>
    ),
    readTime: '1.5分',
    interestedCount: 15,
    hasSession: false,
  },
  {
    id: 7,
    title: '思春期の生徒心理：反抗か、自立か？',
    category: '生徒心理',
    summary: '生徒に寄り添うために、心身の変化を正しく理解する。',
    content: (
      <div className="space-y-4">
        <p>
          反抗は時に、自我を確立しようとする彼らの方法です。対立するのではなく、まずは耳を傾け、考えを促す質問を投げかけてみましょう。
        </p>
      </div>
    ),
    readTime: '2.5分',
    interestedCount: 156,
    hasSession: true,
    sessionTime: '7月2日 (日) 09:00',
  },
]
