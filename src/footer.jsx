import { Group, Space } from "@mantine/core";
import "./footer.css";
import { Link } from 'react-router-dom';

export function Footer()
{
    return(
        <footer>
            <Group position="center" spacing="xl">
                <div>
                    <h1>Local Vitamins</h1>
                    <Space/>
                    <p>お問い合わせはこちら<br/> wmid23lim@gmail.com  までお願いします。</p>
                </div>
                {"   "}
                <div>
                    <ul>
                        <li><Link to="/eventlist/serviceTerms">利用規約</Link></li>
                        <li><Link to="/eventlist/guide">使い方ガイド</Link></li>
                        <li><Link to="/eventlist/withdrawal">解約方法</Link></li>
                    </ul>
                </div>
            </Group>
        </footer>
    );
}