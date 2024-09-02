export const searchEvent = async ({ keywords }) => {
    // const today = new Date()
    if (keywords.length === 0) {
      const { data } = await supabase.from('EventTable').select()// .gt('date', dayjs(today))
      setEvents(data)
      return
    }

    // キーワードを配列に格納する。（主に複数の場合）
    // 全角スペースで区切った場合
    keywords = keywords.split('　')

    let searching_events = []
    for (let i = 0; i < keywords.length; i++) {
      keywords[i] = '%' + keywords[i] + '%'
      const { data } = await supabase
        .from('EventTable')
        .select()
        .like('search_tags', keywords[i])
        // .gt('date', dayjs(today))
      if (i) searching_events = merge_eventarrays(searching_events, data)
      else searching_events = [...searching_events, data].flat(2)
    }

    setEvents(searching_events)
  }