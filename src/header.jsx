import { useState } from 'react'
import { Burger, Button, Dialog, Drawer, Group } from '@mantine/core'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase }  from './supabaseClient'

export function Header()
{
    const [ dialogopen, setDialogopen ] = useState(false)

    const navigate = useNavigate()

    const log_out = async() => {
        try {
        const { error } = await supabase.auth.signOut()
        navigate('/')
        if (error) throw error
        } catch (error) {
            console.log('Log out failed')
            console.log(error.message)
            alert('ログアウトに失敗しました。')
        } 
    }

    const [opened, setOpened] = useState(false)

    return(
        <>
            <header>
                <Group position='center' spacing='xl'>
                    <Burger
                        opened={opened}
                        onClick={() => { setOpened( (o) => !o)}}
                        size='xl'
                        className='burger'
                    />
                    <h1 className='title'>Local Vitamins</h1>
                </Group>
            </header>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding='xl'
                size='xl'
            >
                {
                    <>
                        <h1>メニュー</h1>
                        <Button 
                            color='red'
                            component={Link}
                            to={'/home'}
                            onClick={() => setOpened(false)}
                        >ホームへ戻る</Button>
                        <nav>
                            <ul>
                                <li onClick={() => { navigate('/home/serviceTerms', false) }}>利用規約(個人情報の取り扱いについて)</li>
                                <li onClick={() => { setDialogopen(true) }}>ログアウト</li>
                            </ul>
                        </nav>
                        <p>お問い合わせはこちら<br/> eiwachiku.c@gmail.com  までお願いします。</p>
                    </>
                }
            </Drawer>
            <Dialog
                opened={dialogopen}
                onClose={ () => {setDialogopen(false)}}
                position={{ top: 350, left: 200 }}
            >
                <p>ログアウトします。よろしいですか？</p>
                <Group>
                    {<>
                        <Button color='red' onClick={ () => { log_out() }}> はい </Button>
                        <Button color='blue' onClick={ () => { setDialogopen(false) }}> いいえ </Button>
                    </>}
                </Group>
            </Dialog>
        </>
    )
}