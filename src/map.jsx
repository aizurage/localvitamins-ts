import { Group } from '@mantine/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './map.css';
import L from 'leaflet'
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

export function Map()
{
    // 緯度経度(会津若松ICを初期位置に設定)
    const aizuwakamatu_ic = [37.522596, 139.917716];
    // 初期マップズームレベル
    const zoom = 15;
    return (
        <Group>
            <MapContainer center={aizuwakamatu_ic} zoom={zoom}>
                <TileLayer
                attribution="&copy; <a href=https://developers.google.com/maps/documentation target='_blank'>Google Map</a>"
                url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                />
            </MapContainer>
        </Group>
    );
}
