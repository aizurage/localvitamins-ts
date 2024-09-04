export const fetchParticipants = async (eventID) => {
    const { data } = await supabase
      .from('Participants')
      .select()
      .eq('eventID', eventID)
}