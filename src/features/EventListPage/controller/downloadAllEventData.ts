export const downloadEventData = async () => {
    // const today = new Date()
    const { data } = await supabase
      .from('EventTable')
      .select()
      // .gt('date', dayjs(today))
    setEvents(data)
}