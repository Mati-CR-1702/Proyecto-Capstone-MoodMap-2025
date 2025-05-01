//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\FrontEndMoodMap\src\styles\headerStyles.ts


import { StyleSheet } from "react-native"

export const headerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf8ec',
        paddingTop: 20,
        paddingHorizontal: 16,
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: 'transparent',
      },
      icon: {
        fontSize: 24,
        backgroundColor: 'transparent',
        marginTop: 10,
        marginLeft: 10,
      },
      avatar: {
        fontSize: 24,
        backgroundColor: 'transparent',
        marginTop: 10,
        marginRight: 10,
      },
});