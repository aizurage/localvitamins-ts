export const downloadMyEventData = async () => {
    // const today = new Date()
    const { data } = await supabase
      .from('EventTable')
      .select()
      .eq('planner_uniqueID', supabase.auth.user().id)
      // .gt('date', dayjs(today))
    if (data == null) return
    setEvents(data)
}