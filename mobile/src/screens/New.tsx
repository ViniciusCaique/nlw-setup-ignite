import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']


export function New() {

    const [ title, setTitle ] = useState('')

    const [ weekDays, setWeekDays ] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit() {
        try {
            if(!title.trim() || weekDays.length === 0) {
                return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha um dia pelo menos')
            }

            await api.post('habits', {
                title,
                weekDays,
            })

            setTitle('')
            setWeekDays([])

            Alert.alert('Novo Hábito', 'Hábito criado com sucesso')

        } catch (error) {
            console.log(error)
            Alert.alert('Oops', 'Não foi possível criar um novo hábito')
        }
    }



    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom:100 }}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                
                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimendo? 
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white border-2 focus:border-green-6z00"
                    placeholder="Exercícios, dormir bem, etc "
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />
                
                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>

                {
                    availableWeekDays.map((weekDay, i) => (
                        <CheckBox 
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(i)}
                            onPress={() => handleToggleWeekDay(i)}
                        />
                    ))
                }

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                    /> 

                    <Text className="text-white font-semibold text-base ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}